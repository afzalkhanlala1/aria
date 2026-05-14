# Aria — Go-To-Market Playbook

**Service:** Managed AI Front Desk for aesthetic clinics
**Operator:** You, selling from Pakistan to US clinic owners
**Budget:** Minimal / near-zero
**Goal:** First 3 paying clients in 90 days. 10 by month 9.

---

## 0. Mental model before you do anything

You are not selling "AI automation." You are selling a **diagnosis** — and your service is the cure.

Every dollar of attention should go into one of three buckets:

1. **Trust assets** — your face, your voice, your specific numbers, your case studies.
2. **Diagnostic outreach** — the Free Missed Revenue Audit. Never pitch cold. Always diagnose first.
3. **Compounding inventory** — short videos, written teardowns, audits you can repurpose forever.

Anything that doesn't fall into one of those three is noise. Skip it.

---

## 1. Positioning (write these on a sticky note)

**One-liner:**
> "Aria is a managed AI front desk for med spas — we answer every call, every DM, every after-hours lead, and book them into your Boulevard / Aesthetic Record / Mangomint."

**The wedge (what you lead with):**
> "Most clinics I audit are losing $30,000–$60,000/month to calls they never answer. I'll prove it to you in 4 minutes."

**Who you DON'T talk to:**
- Sub-$500K revenue clinics (can't afford you, won't get ROI)
- PE-backed chains (centralized procurement, will never sign with a foreign vendor)
- Pre-launch clinics (no database = no day-one win)
- Practices where you're talking to a manager, not the owner

**Geography order (do not skip):**
TX → FL → AZ → NV → SoCal → NY/NJ. Get 3 clients in Texas before you touch Florida. Specificity beats reach.

---

## 2. Zero-cost trust stack (build this in week 1)

These all exist before you send a single cold email. Trust is the bottleneck when selling from overseas — every shortcut here costs you 10 leads.

| Asset | Cost | Tool |
|---|---|---|
| US business phone number | $1/mo | Google Voice (or Twilio $1/mo) |
| Professional headshot | $0 | Phone + window light + plain wall + 5 retakes |
| 30-second pitch video on home page | $0 | Loom free tier |
| Aria.work-equivalent landing page | $0 | The site you just built — deploy free on Vercel |
| LinkedIn profile, positioned | $0 | LinkedIn |
| Calendly with 30-min audit slots | $0 | Calendly free |
| Stripe / Mercury account | $0 | Stripe Atlas can wait until first client |
| Service agreement | $0 → $500 | Cloud-based template now, lawyer ($500 on UpCounsel) after client #2 |
| Demo number for inbound (people call Aria) | $1/mo | Twilio + Vapi free trial |

**One critical move:** record a 30-second Loom of your face introducing yourself, embed it on the homepage and on every cold email landing page. Trust ≠ words, trust = face + voice. This single asset will double your conversion.

---

## 3. The Free Missed Revenue Audit (your only offer for 90 days)

Stop offering "a demo." Stop offering "a call." Offer the audit.

### Production recipe — 25 min per audit, repeat forever

1. **Call the clinic 3 times** from your US Google Voice number:
   - Once at 11:30 AM (busy lunch lead-in)
   - Once at 5:45 PM (right before they close)
   - Once at 9:30 PM (after-hours — this is where the gold is)
2. **Record the call** (most US states are 1-party consent — Google Voice records natively). Be a regular potential patient: "Hi, I was thinking about getting [Botox / Morpheus8 / lip filler], can you tell me about pricing and availability?"
3. **Screenshot anything embarrassing** — the voicemail box that's full, the hold music for 4 minutes, the "leave a message" with no callback within 24h.
4. **Compute the lost revenue**: their avg ticket (~$1,500 for med spas, find on their site) × your conservative estimate of missed bookings per week × 4.3 weeks.
5. **Record a 4-minute Loom** with your face in the bottom-right:
   - "Hi Dr. Patel, my name is [Your Name] from Aria. I just called your clinic three times. Here's what happened…" (play clips)
   - "Conservatively, this is costing you $X,XXX per month."
   - "I built a tool to solve exactly this — I'd love to walk you through it for 15 minutes."
   - End with: "If a 15-min call doesn't sound right, no worries — I'll send the full audit PDF anyway, free, with no follow-up. Just reply 'send.'"
6. **Email it** with the Loom embedded and a Calendly link. Subject: `"[Clinic name] — I just called 3 times"`.

That last step — offering to send it anyway with no obligation — is the unlock. It builds reciprocity. Most owners will reply just to receive the PDF, and then half of them will book a call after they watch it.

### Why this works
- **Specific** — to their clinic, with their phone number, in their voice.
- **Earned trust** — you did 30 min of free work for them.
- **Pitch-free** — you offered a diagnosis, not a sale.
- **Loom > email** — your face de-risks the "vendor from overseas" trust gap.

---

## 4. Cold email — the 4-touch sequence (copy verbatim)

**Tools, all free:**
- **Apollo.io** free tier: 50 lead exports/month, enrich emails for free
- **Hunter.io** free tier: 25 verifications/month
- **Gmail** with personal signature (do NOT buy a paid email tool until you have $10K MRR)
- **Mixmax / Streak free tier**: track opens

**Search Apollo for:** Title = `Owner OR Founder OR Medical Director OR Doctor of [field]`, Industry = `Health, Wellness & Fitness OR Hospital & Health Care`, Location = `Texas, Houston Austin Dallas`, keywords on company description = `med spa OR aesthetic OR injectable OR dermatology`.

**Send 20 / day, manually.** That's it. Do not blast. Personalization >>> volume in this niche.

### Touch 1 — Day 0 — Subject: `Re: [Clinic Name] — I called 3 times today`

```
Hi Dr. {first_name},

I called {clinic_name} three times today — 11:30am, 5:45pm and 9:30pm — to ask about Botox pricing. Here's what happened on each call (it's not great).

I recorded a 4-minute Loom for you that shows you the exact missed revenue, with the recordings: {loom_link}

I run Aria — we operate the AI front desk for med spas in {state}. Most of the clinics I audit lose $30–60K/month to missed calls. I'd love to show you what your number is.

If you'd rather just have the full audit PDF (no calls, no follow-up), reply "send" and I'll email it.

— {your_name}
{your_loom_intro_url}
```

### Touch 2 — Day 4 — Subject: `that audit ↑`

```
Hey Dr. {first_name} — circling back. Did the audit reach you ok?

Happy to send the full thing PDF-only if a call isn't your thing.

— {your_name}
```

### Touch 3 — Day 9 — Send a Loom showing one new thing

```
Hey {first_name},

Wanted to send one more thing — I plugged your clinic's website into Aria as a quick test and trained a 90-second voice agent on your treatment menu. Here's a call with it:

{loom_or_demo_url}

(That's the actual AI, calling itself, with your clinic's pricing.) Sound like something worth 15 min?

— {your_name}
```

### Touch 4 — Day 16 — Polite break-up

```
{first_name} — last note from me unless you say otherwise. Two things:

1. The audit + demo are yours to keep, no strings.
2. If timing isn't right, no problem — I'll check back in Q{next quarter}.

In the meantime, here's a 1-pager I wrote for med spa owners on cutting no-show rates from 25% → 12%: {free_resource_url}

Best,
{your_name}
```

After touch 4 → mark them "long-term nurture" and add to monthly content list.

**Realistic numbers:**
- 80 personalized emails / week = 320 / month
- Reply rate: 8–15% (very high for this niche when audit is real)
- Audit → call rate: 30–40%
- Call → close rate: 25–35%

Math: 320 × 10% × 35% × 30% ≈ **3 clients per month** by month 3. The pipeline compounds.

---

## 5. Instagram DM — where med spa owners actually live

Med spa owners spend more time on Instagram than email. Don't skip this.

### Setup
- Personal IG looking professional with 5–10 posts (clinic teardowns, case studies, demo clips). DO NOT pitch in feed.
- Bio: `"AI front desk for med spas · audit your missed calls free 👇"` + Calendly link
- Story highlights labeled: `Demos`, `Wins`, `How it works`, `Audit`
- Follow 100 ideal-fit clinics per week. Engage thoughtfully on their posts (1 real comment per clinic per week — not "🔥" but "obsessed with the lighting in this treatment room — is that wall paint or wallpaper?")

### DM Script A — "Audit hook" (use after 2-3 weeks of engagement)

```
Hey {first_name}! Loved the {specific_thing_you_remembered_from_their_grid}.

Quick weird offer — I run audits on aesthetic clinics' phone systems (I do them free). Just called {clinic_name} 3x today and recorded a 4-min Loom showing you exactly what calls you missed and what they're worth.

Want me to send it? No pitch, no follow-up if you don't want.
```

### DM Script B — "Reactivation tease" (mid-funnel)

```
Hey {first_name} — random question: roughly how many people have ever inquired with {clinic_name} but never actually booked?

Asking because I just helped a clinic in {nearby_city} text 2,400 dormant leads with an AI-personalized promo — booked 23 appointments in 9 days. Took 0 staff hours.

Would something like that be useful, or are you not really sitting on a database?
```

### DM Script C — "Voicemail teardown" (most engagement)

```
Hey — I called your clinic at 9pm last night to ask about lip filler (just doing research for a piece I'm writing about after-hours conversion for med spas).

Your voicemail is 100% professional, but here's the thing — even great voicemails convert at like 4%, vs. a same-night booking which is 35%+.

I made a 90-second demo where my AI handles the exact same call. Want me to send?
```

**Pace:** 5 DMs/day, manually. No automation. Instagram will shadow-ban you if you batch.

---

## 6. LinkedIn — the slow burn

LinkedIn is slow but builds inbound for years.

### Profile setup
- Headline: `Founder, Aria · AI Front Desk for Aesthetic Clinics · DM "audit" for a free one`
- Cover photo: your dashboard screenshot or a "before/after voicemail vs. Aria" graphic
- About section: 3 short paragraphs about who Aria is for, what it does, why you do it. End with the audit CTA.

### Content cadence (post 3x / week, takes 2 hours total)

| Day | Format | Topic |
|---|---|---|
| Mon | Carousel | "I called 12 med spas in Dallas at 9pm. Here's what I heard." (your audits, anonymized) |
| Wed | Text post | One specific learning ("Why 'leave a message' converts at 3% in aesthetics") |
| Fri | Demo video | 30-sec clip of Aria handling a real call, with subtitles |

### Outreach
- Connect with 20 clinic owners / week with a personalized note: `Hi Dr. {name} — I write about front desk operations for aesthetic clinics. Would love to learn from your experience.` That's it. No pitch.
- Once they accept, wait 3 days. Then send the audit-hook DM (same script as cold email).

---

## 7. Partnership channel — the underrated unlock

Find people who already sell to your customer and don't compete with you.

**Targets:**
- Med spa consultants (e.g. Faces by Brad, AmSpa instructors, Ladi Pham, etc.)
- Medical marketing agencies (Influx, NKBJ, etc.)
- Practice management software resellers
- Aesthetic equipment reps (devices like Morpheus8, BBL — reps know every clinic in their region)
- Med spa bookkeepers / fractional CFOs

**Offer:** 20% of MRR for 12 months on any client they refer that closes. Or $1,000 flat per closed client (their preference).

**Outreach:**

```
Subject: 20% rev share to your med spa clients

Hi {name},

Quick one — I run Aria, the AI front desk for med spas. Most of your clients (especially the ones doing $2M–$8M) are leaking $40K+/mo to missed calls and no-shows.

I'm offering 20% recurring rev share for 12 months on any client you refer that signs. Avg deal is $2,500/mo MRR + $3,500 setup, so that's ~$6,500/year per referred client with zero work on your end.

Worth a 15-min chat?

— {your_name}
```

Land **2–3 active referrers** by month 4. Each referrer typically sends 1–3 quality leads/month.

---

## 8. Content / inbound (the slow compounder)

This is what makes month 18 way better than month 6. Start now.

### YouTube channel — `Aria Front Desk` (or your name)
Post **1 video / week**, 4–6 minutes, recorded on phone or laptop webcam.

Content themes that work:
1. **"I audited [N] med spas in [city]"** — anonymized audit roundups
2. **AI demos** — Aria handling specific scenarios end-to-end (Botox inquiry, no-show callback, IG DM)
3. **Operator interviews** — clinic owners walking through their numbers (cold-pitch this aggressively, owners love the exposure)
4. **Niche tutorials** — "How to cut no-shows in half in 30 days," "Boulevard automation tips," "How to read your Meta Ads CPL like an owner not a marketer"

Cross-post:
- YouTube → vertical 60-sec clips to IG Reels + TikTok + LinkedIn video
- Long version → blog post on your site
- Audio → upload to Spotify as a podcast (free via Spotify for Creators)

**Why it matters:** in 12 months you'll have 50 videos. Every cold email reply will mention "I checked out your YouTube." That single line saves the sale.

### Free lead magnets
1. **PDF: "The Med Spa Owner's Missed Revenue Audit Worksheet"** — 4-page DIY version of your audit, with a CTA to book a real one
2. **PDF: "30-Day No-Show Recovery Playbook"** — script templates owners can use without AI (gives away value, builds trust)
3. **Free Loom course** — `5 Loom videos: "The first hour of every clinic's AI front desk deployment"` — for owners who want to peek under the hood

Each of these = a tweet, a LinkedIn post, an IG carousel, and a YouTube video. One asset, 4 distributions.

---

## 9. Free / near-zero tool stack

| Job | Tool | Cost |
|---|---|---|
| Land/page hosting | Vercel | $0 |
| Calls (US number) | Google Voice or Twilio | $0–$1 |
| Audit recording | Loom free | $0 (25 vids/mo) |
| Email send + track | Gmail + Mixmax/Streak | $0 |
| Lead scraping | Apollo free tier | $0 (50 contacts/mo) |
| Email verification | Hunter free | $0 (25/mo) |
| CRM | Notion or Airtable | $0 |
| Scheduling | Calendly free | $0 |
| Demo voice agent | Vapi $10 free credit + ElevenLabs free | $0 |
| Video editing | CapCut | $0 |
| Banking | Mercury (no Pakistan blocker; alt: Wise) | $0 |
| Receiving USD | Wise or Stripe Atlas later | ~$300 one-time when ready |

Total monthly burn for outreach: under $20. You can run this entire system from a laptop and your phone.

---

## 10. Day-by-day execution plan (first 30 days)

### Week 1 — Foundation (8 hours/day)

**Day 1 (Mon)**
- Buy Google Voice number, set up voicemail
- Deploy the Aria site to Vercel (free)
- Set up Calendly with 30-min "Audit Walkthrough" slots
- Create Gmail with your real name + signature including headshot

**Day 2 (Tue)**
- Record 30-second intro Loom for homepage
- Build LinkedIn profile per Section 6
- Set up IG business profile per Section 5

**Day 3 (Wed)**
- Create Apollo account, save your ICP filter
- Build a list of 200 Texas med spa owners (use Apollo + Google Maps + Instagram)
- Drop into Airtable / Notion with columns: Name, Clinic, Email, Phone, IG, Website, City, Status, Notes, Last touch

**Day 4 (Thu)**
- Record your first 3 audits (Texas clinics). Aim for 25 min each.
- Send all 3 emails. These are practice runs — don't expect responses yet.

**Day 5 (Fri)**
- Set up Vapi free trial, build a voice agent prototype on YOUR demo number
- Embed it on the homepage as the "click to hear" demo
- Test it twice

**Days 6–7 (Sat/Sun)**
- Record one YouTube video: "I called 12 Texas med spas at 9pm. Here's what they're losing."
- Edit it (CapCut, 60-90 min)
- Schedule it for Monday

### Week 2 — Outreach starts

**Daily ritual (90 minutes):**
- 20 personalized cold emails sent (use the Apollo list — research each clinic for 90s)
- 5 IG DMs sent
- 5 LinkedIn connection requests sent
- Reply to anyone who responded

**Cadence over the week:**
- Mon: 3 new audits recorded → emails sent
- Tue: 3 new audits → emails
- Wed: 3 new audits → emails + LinkedIn post (carousel: "this week's audit findings")
- Thu: 3 audits → emails + YouTube video posted
- Fri: 3 audits → emails + IG Reel from the YouTube cut

**End of Week 2 target:**
- ~80 cold emails sent
- ~25 personalized audits recorded
- 1 YT video, 2 IG Reels, 2 LinkedIn posts live
- First 1–2 audit-call bookings on Calendly

### Week 3 — First conversations

**Continue daily ritual.**

**Also:**
- Run every booked audit-walkthrough call. Use this script:
  - **0–2 min:** Rapport. "Saw you just opened your 2nd location, congrats."
  - **2–5 min:** Walk through their audit. Show the recordings.
  - **5–12 min:** Compute their missed revenue conservatively. Ask: "Does this number seem high or low to you given what you're seeing?"
  - **12–18 min:** Demo Aria on their actual menu. Live.
  - **18–25 min:** "Here's what working with us looks like." Show the 14-day timeline. Quote the price as flat: "$3,500 to build it, $2,500/month to run it. First 90 days are recoupable — if we don't recover 3× our fee, we extend free."
  - **25–28 min:** "What do you need from me to make a decision this week?"
  - **28–30 min:** Agree on next step (signed agreement, deposit, kickoff date).

### Week 4 — Close + iterate

**Same daily ritual.**

**Also:**
- Follow up on every audit recipient that didn't reply with touch 2.
- Audit your funnel: of 80 emails → how many replies → how many calls → how many quotes → how many closes? Find the leak.
- If reply rate < 5%, your subject lines or audit quality is weak. Re-record 3 audits with more energy.
- If call rate < 30%, your Loom needs work (face, energy, specificity).
- If close rate < 25%, your demo or price framing is weak. Always reframe price as "vs. one missed appointment."

**End of Month 1 target:**
- 1 paying client signed (realistic if you grind)
- 3–5 in active negotiation
- 15–25 in audit-delivered pipeline
- 1 YouTube channel with 4 videos, 1 LinkedIn presence with 12 posts

---

## 11. Tracking — one sheet, three numbers

Build this in Airtable / Notion / Google Sheets. Update daily.

```
Date | Emails sent | Replies | Calls booked | Calls held | Quotes | Closed | Notes
```

Compute weekly:
- **Reply rate** = Replies / Emails (target 10%)
- **Call rate** = Calls booked / Replies (target 35%)
- **Show rate** = Calls held / Calls booked (target 75%)
- **Close rate** = Closed / Quotes (target 30%)

If any number is below target for 2 weeks → fix that step before adding volume. Don't outwork a broken funnel.

---

## 12. The 90-day commitment, in one line

**Send 20 emails, record 3 audits, post 1 piece of content. Every weekday. For 90 days. Nothing else.**

By day 90 you will have:
- 1,200 personalized cold emails sent
- 180+ free audits delivered
- 60+ pieces of content live
- A YouTube channel and LinkedIn presence to point any prospect to
- Real conversations with 30–50 clinic owners
- 3–6 paying clients

That's $7,500–$15,000 MRR + setup fees, with under $20/month in tools spent, working from anywhere.

---

## 13. Things that look smart but will waste your time

Skip these — they look productive, they're not.

- Building your own ad campaign on Meta or Google. (Wait until month 12+.)
- Buying email automation tools. (You're not at volume that justifies it.)
- Cold-calling clinics yourself. (Friction is too high for offshore.)
- Sponsoring AmSpa or Aesthetic Next before you have 5 case studies. (Wait.)
- Building a referral program for clients. (Premature; do it after client 5.)
- Hiring an SDR. (Definitely premature.)
- Writing a Medium blog. (No distribution.)
- Buying premium LinkedIn. (Free tier is fine for outreach.)
- Building a custom CRM. (Airtable is fine until $30K MRR.)

---

## 14. When to evolve

| At this MRR | Add this |
|---|---|
| $5K MRR | Lawyer review your contract (UpCounsel, $500-800) |
| $10K MRR | Hire a part-time VA for audit-recording busywork ($500/mo) |
| $20K MRR | Sponsor or attend one AmSpa event (~$3K all-in) |
| $30K MRR | Run a small Meta ad to lookalikes of audit watchers |
| $50K MRR | Hire your first full-time AE (commission heavy) |
| $100K MRR | Open a US C-corp via Stripe Atlas for cleaner contracting |

---

That's the entire system. The most important sentence in this document is the one in Section 12. Print it out and stick it above your laptop.
