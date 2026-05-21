import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

export const FROM =
  process.env.RESEND_FROM || "Frontlea <onboarding@resend.dev>";
export const LEAD_INBOX =
  process.env.LEAD_NOTIFICATION_EMAIL || "hello@frontlea.com";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
