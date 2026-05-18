import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://aria.work";

const STATIC_ROUTES = [
  "",
  "/demo",
  "/how-it-works",
  "/roi",
  "/pricing",
  "/customers",
  "/faq",
  "/audit",
  "/compliance",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/audit" || path === "/demo" ? 0.9 : 0.7,
  }));
}
