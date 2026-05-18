/**
 * In-memory store for per-clinic demo system prompts produced by the URL
 * scraper. Survives across requests on a warm Node instance, lost on cold
 * starts. For production hardening, replace with Vercel KV / Upstash Redis
 * (same shape — read/write a JSON blob keyed by `demoId`).
 */

export type ClinicService = {
  name: string;
  price?: string;
  description?: string;
};

export type ClinicProvider = {
  name: string;
  role?: string;
};

export type ClinicProfile = {
  brandName: string;
  industry: string;
  city?: string;
  state?: string;
  hours?: string;
  phone?: string;
  email?: string;
  website: string;
  services: ClinicService[];
  providers: ClinicProvider[];
  tone: "warm" | "clinical" | "luxe" | "playful" | "professional";
  uniqueSellingPoints: string[];
  knownGaps: string[];
};

export type DemoRecord = {
  demoId: string;
  profile: ClinicProfile;
  systemPrompt: string;
  createdAt: number;
};

const TTL_MS = 24 * 60 * 60 * 1000; // 24h
const store = new Map<string, DemoRecord>();

export function putDemo(record: DemoRecord): void {
  store.set(record.demoId, record);
}

export function getDemo(demoId: string): DemoRecord | null {
  const rec = store.get(demoId);
  if (!rec) return null;
  if (Date.now() - rec.createdAt > TTL_MS) {
    store.delete(demoId);
    return null;
  }
  return rec;
}

/** Generates a short URL-safe id. 12 chars of base62 ≈ 71 bits of entropy. */
export function newDemoId(): string {
  const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    for (const b of bytes) id += alphabet[b % alphabet.length];
  } else {
    for (let i = 0; i < 12; i++)
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return id;
}
