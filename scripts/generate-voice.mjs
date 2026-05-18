#!/usr/bin/env node
/**
 * One-time generator for the scripted voice-demo audio files.
 *
 *   1. Put OPENAI_API_KEY=sk-... in `aria/.env.local`
 *   2. From `aria/`, run: `npm run voice:generate`
 *
 * Outputs MP3 files into `public/voice/<scenario>/<role>-<index>.mp3`.
 * The VoiceDemo component prefers these if present and falls back to the
 * browser's built-in speech synthesis when they're missing.
 *
 * Costs are tiny (gpt-4o-mini-tts is fractions of a cent per turn).
 * Safe to re-run — files are overwritten in place.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

await loadDotEnv(path.join(projectRoot, ".env.local")).catch(() => {});
await loadDotEnv(path.join(projectRoot, ".env")).catch(() => {});

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ OPENAI_API_KEY is not set. Add it to aria/.env.local first.");
  process.exit(1);
}

const { default: OpenAI } = await import("openai");
const client = new OpenAI({ apiKey });

// Inline mirror of src/lib/voice-scripts.ts — keep in sync if you change one.
// (Node 20 doesn't natively import .ts files; mirroring is simpler than adding tsx.)
const { VOICE_SCRIPT, VOICE_BY_ROLE } = loadFallbackScripts();

const model = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";

const ariaInstructions = "Warm, professional, friendly female front-desk receptionist. Confident, smiling tone, never robotic. Speak at a relaxed natural pace.";
const callerInstructions = "Casual, slightly distracted patient on the phone, mid-thirties. Friendly but informal — like a real client calling a med spa.";

const outRoot = path.join(projectRoot, "public", "voice");
await fs.mkdir(outRoot, { recursive: true });

let generated = 0;
let skipped = 0;

for (const [scenario, turns] of Object.entries(VOICE_SCRIPT)) {
  const dir = path.join(outRoot, scenario);
  await fs.mkdir(dir, { recursive: true });
  console.log(`\n▸ ${scenario} (${turns.length} turns)`);

  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];
    const file = path.join(dir, `${turn.who}-${i}.mp3`);

    if (process.env.SKIP_EXISTING === "1") {
      try {
        await fs.access(file);
        skipped++;
        process.stdout.write(`  · skip ${turn.who}-${i}\n`);
        continue;
      } catch {}
    }

    const voice = VOICE_BY_ROLE[turn.who];
    const instructions = turn.who === "aria" ? ariaInstructions : callerInstructions;

    process.stdout.write(`  · ${turn.who}-${i} (${voice})… `);
    try {
      const response = await client.audio.speech.create({
        model,
        voice,
        input: turn.text,
        instructions,
        response_format: "mp3",
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(file, buffer);
      generated++;
      process.stdout.write(`ok (${(buffer.length / 1024).toFixed(0)} KB)\n`);
    } catch (err) {
      process.stdout.write(`fail\n`);
      console.error(`    ${err && err.message ? err.message : err}`);
    }
  }
}

console.log(`\n✅ Generated ${generated} clips, skipped ${skipped}.`);
console.log(`   Files: public/voice/<scenario>/<role>-<index>.mp3`);
console.log(`   Re-run with SKIP_EXISTING=1 to skip already-generated clips.`);

// -----------------------------------------------------------------------------

async function loadDotEnv(file) {
  const text = await fs.readFile(file, "utf8");
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function loadFallbackScripts() {
  return {
    VOICE_BY_ROLE: { aria: "shimmer", caller: "alloy" },
    VOICE_SCRIPT: {
      new: [
        { who: "aria", text: "Thank you for calling Luxe Aesthetics, this is Aria. How can I help you today?" },
        { who: "caller", text: "Hi, I was wondering how much you charge for Botox?" },
        { who: "aria", text: "Of course — our Botox starts at thirteen dollars per unit, with most patients using between twenty and forty units. Are you new to Luxe, or have you been with us before?" },
        { who: "caller", text: "I'm new. I'd love to try it for my forehead lines." },
        { who: "aria", text: "Wonderful. Most first-time forehead treatments are between twenty and thirty units. I have a complimentary consultation with Dr. Patel this Thursday at three thirty, or Friday at eleven — which works better?" },
        { who: "caller", text: "Thursday at 3:30 works." },
        { who: "aria", text: "Perfect, I'm holding Thursday at three thirty with Dr. Patel. Can I grab your full name and a mobile number for the confirmation text?" },
        { who: "caller", text: "Sarah Reeves, 512-555-4801." },
        { who: "aria", text: "Booked. You'll get a text right now with the appointment and our pre-care checklist. We'll see you Thursday, Sarah!" },
      ],
      "after-hours": [
        { who: "aria", text: "Thanks for calling Luxe Aesthetics — we're closed for the evening, but I can help you book right now. What were you hoping to learn about?" },
        { who: "caller", text: "I saw your Morpheus8 special on Instagram, can I get info?" },
        { who: "aria", text: "Yes! Our holiday Morpheus8 package is three sessions for twenty-one hundred dollars — typically twenty-seven hundred. Is this for face, neck, or both?" },
        { who: "caller", text: "Face and neck." },
        { who: "aria", text: "Lovely. I have a complimentary consultation tomorrow at ten, or Saturday at one. Which works?" },
        { who: "caller", text: "Saturday 1pm." },
        { who: "aria", text: "Booked. Sending confirmation by text and email now. See you Saturday!" },
      ],
      reschedule: [
        { who: "aria", text: "Hi Sarah, this is Aria from Luxe Aesthetics — I'm calling because we missed you for your three thirty today. I'd love to help you reschedule. Is now a good time?" },
        { who: "caller", text: "Oh shoot, I totally forgot. Yes, I want to reschedule." },
        { who: "aria", text: "No problem — these things happen. I have Friday at eleven or Monday at two with Dr. Patel. Any preference?" },
        { who: "caller", text: "Friday 11am." },
        { who: "aria", text: "Done. You'll get a fresh confirmation text, plus a friendly reminder the day before. Thanks Sarah, see you Friday." },
      ],
    },
  };
}
