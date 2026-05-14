# Aria — AI Front Desk for Aesthetic Clinics

Marketing site + go-to-market playbook for **Aria**, the managed AI front-desk service for med
spas, cosmetic dental, plastic surgery, and dermatology practices.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.
Zero runtime dependencies beyond the Next.js core.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fafzalkhanlala1%2Faria)

---

## Run it

```bash
cd aria
npm install     # only if node_modules is missing
npm run dev     # http://localhost:3000  (or pass -p 3007)
```

## Build & preview production

```bash
npm run build
npm run start
```

## Deploy free (recommended)

Push the `aria/` folder to a GitHub repo and import it on [vercel.com](https://vercel.com) — it
deploys for $0 in about 60 seconds. The site is fully static (no server actions).

---

## What's on the page

| Section | Purpose | File |
|---|---|---|
| Hero + live dashboard | Hook + animated proof | `src/components/hero.tsx`, `dashboard.tsx` |
| Problem statement | Frames the "1 in 3 missed leads" loss | `src/components/sections.tsx` |
| **Voice demo** | Interactive: pick a scenario, watch Aria book the appointment | `src/components/voice-demo.tsx` |
| **Chat demo** | Animated IG DM concierge conversation | `src/components/chat-demo.tsx` |
| **ROI calculator** | Move sliders → see live missed-revenue + Aria recovery | `src/components/roi-calculator.tsx` |
| 6 features | The full service breakdown | `src/components/features.tsx` |
| 14-day timeline | Onboarding & go-live | `src/components/timeline.tsx` |
| Pricing | Flat retainer + 3× guarantee | `src/components/pricing.tsx` |
| Operator proof | Pilot/aggregate results | `src/components/proof.tsx` |
| FAQ | Pre-emptive objection handling | `src/components/faq.tsx` |
| **Audit CTA** | Captures Free Missed Revenue Audit requests | `src/components/cta.tsx` |
| Footer | — | `src/components/footer.tsx` |

The voice demo, chat demo, ROI calculator, FAQ accordion and audit form are
client components (`"use client"`). Everything else is pure server-rendered.

## Audit form submissions

The audit form (in `cta.tsx`) currently writes submissions to `localStorage` under the key
`aria-audits` so you can verify it works without a backend. **Before going live**, swap that for
a real handler — recommended options:

- **No-code:** point the form to a [Tally](https://tally.so) form (free) or
  [Formspree](https://formspree.io) (free tier) — change the `submit()` handler to `fetch()` their endpoint.
- **API route:** add `src/app/api/audit/route.ts` and POST to it from `submit()`.
- **Calendly direct:** add `?prefill_name=...&prefill_email=...` to a Calendly link and redirect on submit.

---

## Design tokens

All colors / type are CSS variables in `src/app/globals.css`:

```css
--bg: #f7f2ec;          /* warm cream */
--ink: #0d0f0e;         /* deep ink */
--emerald: #0e4a3f;     /* primary accent */
--emerald-deep: #07291f;
--rose: #c9a687;        /* warm highlight */
--gold: #b89b6e;
```

Typography: **Instrument Serif** (display, italic-ready) + **Geist Sans** (body).

---

## Marketing strategy

The full go-to-market playbook — positioning, free trust assets, the Free Missed Revenue Audit
recipe, 4-touch cold email sequence, IG DM scripts, LinkedIn cadence, partner/affiliate channel,
content engine, and a day-by-day 30-day execution plan — ships in this repo:

**[`MARKETING.md`](./MARKETING.md)** — read this end to end before sending a single email.
