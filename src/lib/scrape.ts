/**
 * Light-touch HTML scraper. Designed for clinic marketing sites which are
 * almost always server-rendered (Squarespace, Wix, Webflow, WordPress).
 * For JS-only sites we degrade to "couldn't find content, here's a generic
 * Aria" and the user can describe their clinic to the chat agent directly.
 *
 * Hardening on top of raw fetch:
 *   - Timeout (8s) to avoid hanging on slow sites
 *   - Size cap (1.5 MB) to avoid pulling in giant pages
 *   - Hostname denylist (no localhost, no private IPs, no IP literals)
 *   - Strict https/http only
 *   - Best-effort follow of a couple of obvious sub-pages (pricing, services)
 */

import * as cheerio from "cheerio";

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 5 * 1024 * 1024;
// Some clinic sites (Cloudflare-fronted, etc.) 403 a bare bot UA, so we send
// a real-looking Chrome string. We still identify ourselves via Referer.
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 AriaDemoBot/1.0 (+https://aria.work)";

const SUB_PAGE_KEYWORDS = [
  "pricing",
  "services",
  "treatments",
  "menu",
  "about",
  "team",
  "providers",
  "contact",
  "hours",
];

export type ScrapeResult = {
  url: string;
  ok: boolean;
  reason?: string;
  pages: ScrapedPage[];
  combinedText: string;
};

export type ScrapedPage = {
  url: string;
  title: string;
  description?: string;
  text: string;
};

export function validateUrl(input: string): { ok: true; url: URL } | { ok: false; reason: string } {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return { ok: false, reason: "That doesn't look like a valid URL. Try https://your-clinic.com" };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, reason: "URL must start with http:// or https://" };
  }
  const host = url.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host === "0.0.0.0" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
    /^[a-f0-9:]+$/i.test(host) // raw IPv6
  ) {
    return { ok: false, reason: "Public domain URLs only — no IPs or internal hostnames." };
  }
  return { ok: true, url };
}

async function fetchText(url: string): Promise<{ html?: string; reason?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!res.ok) {
      return { reason: `Site returned HTTP ${res.status}.` };
    }
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      return { reason: "Site didn't return HTML." };
    }

    // Read body with size cap.
    const reader = res.body?.getReader();
    if (!reader) {
      return { reason: "Couldn't read the page body." };
    }
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        return { reason: "Page is unusually large; skipping for safety." };
      }
      chunks.push(value);
    }
    const buf = new Uint8Array(total);
    let offset = 0;
    for (const c of chunks) {
      buf.set(c, offset);
      offset += c.byteLength;
    }
    const html = new TextDecoder("utf-8", { fatal: false }).decode(buf);
    return { html };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { reason: "Site took too long to respond." };
    }
    return { reason: "Couldn't reach the site." };
  } finally {
    clearTimeout(timer);
  }
}

function extractCleanText($: cheerio.CheerioAPI): string {
  // Drop noisy nodes.
  $("script, style, noscript, nav, footer, header, svg, iframe, form").remove();
  const body = $("body");
  const raw = (body.text() || $.root().text()).replace(/\s+/g, " ").trim();
  // Cap at ~12k chars per page — plenty for extraction, keeps prompt cheap.
  return raw.length > 12_000 ? raw.slice(0, 12_000) : raw;
}

function pickSubPages($: cheerio.CheerioAPI, baseUrl: URL): string[] {
  const candidates = new Set<string>();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    let abs: URL;
    try {
      abs = new URL(href, baseUrl);
    } catch {
      return;
    }
    if (abs.hostname !== baseUrl.hostname) return;
    if (abs.pathname === baseUrl.pathname) return;
    const path = abs.pathname.toLowerCase();
    if (SUB_PAGE_KEYWORDS.some((k) => path.includes(k))) {
      // strip hash/query for de-dupe
      candidates.add(`${abs.origin}${abs.pathname}`);
    }
  });
  return Array.from(candidates).slice(0, 4); // cap at 4 sub-pages
}

export async function scrapeClinicSite(input: string): Promise<ScrapeResult> {
  const v = validateUrl(input);
  if (!v.ok) {
    return { url: input, ok: false, reason: v.reason, pages: [], combinedText: "" };
  }
  const homeUrl = v.url;
  const homeFetch = await fetchText(homeUrl.toString());
  if (!homeFetch.html) {
    return {
      url: homeUrl.toString(),
      ok: false,
      reason: homeFetch.reason ?? "Couldn't load the site.",
      pages: [],
      combinedText: "",
    };
  }

  const home$ = cheerio.load(homeFetch.html);
  const homePage: ScrapedPage = {
    url: homeUrl.toString(),
    title: home$("title").first().text().trim() || homeUrl.hostname,
    description:
      home$('meta[name="description"]').attr("content") ||
      home$('meta[property="og:description"]').attr("content") ||
      undefined,
    text: extractCleanText(home$),
  };

  // Best-effort sub-page crawl (in parallel, fail-open).
  const subUrls = pickSubPages(home$, homeUrl);
  const subPages: ScrapedPage[] = [];
  if (subUrls.length > 0) {
    const subResults = await Promise.allSettled(
      subUrls.map(async (u) => {
        const r = await fetchText(u);
        if (!r.html) return null;
        const $ = cheerio.load(r.html);
        return {
          url: u,
          title: $("title").first().text().trim() || u,
          description: $('meta[name="description"]').attr("content") || undefined,
          text: extractCleanText($),
        } as ScrapedPage;
      }),
    );
    for (const r of subResults) {
      if (r.status === "fulfilled" && r.value) subPages.push(r.value);
    }
  }

  const pages = [homePage, ...subPages];

  // If the home page has almost no extractable text, treat as JS-only render
  // and try OG/Twitter meta as a last resort before giving up.
  if (homePage.text.length < 120) {
    const ogTitle =
      home$('meta[property="og:title"]').attr("content") || homePage.title;
    const ogDesc =
      home$('meta[property="og:description"]').attr("content") ||
      homePage.description ||
      "";
    if (ogDesc.length < 40) {
      return {
        url: homeUrl.toString(),
        ok: false,
        reason:
          "Couldn't find meaningful text on the site — it might be a JS-only build. Try again with a SSR'd page, or describe your clinic in chat instead.",
        pages,
        combinedText: "",
      };
    }
    homePage.title = ogTitle;
    homePage.description = ogDesc;
    homePage.text = `${ogTitle}\n${ogDesc}`;
  }

  const combinedText = pages
    .map(
      (p) =>
        `--- PAGE: ${p.title} (${p.url}) ---\n${p.description ?? ""}\n${p.text}`,
    )
    .join("\n\n");

  return {
    url: homeUrl.toString(),
    ok: true,
    pages,
    combinedText:
      combinedText.length > 30_000 ? combinedText.slice(0, 30_000) : combinedText,
  };
}
