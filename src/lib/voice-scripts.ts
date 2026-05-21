export type VoiceTurn = {
  who: "caller" | "aria";
  text: string;
  /** ms after previous turn before this one shows (used only as fallback when no audio) */
  delay: number;
};

export type VoiceScenarioId = "new" | "after-hours" | "reschedule";

export const VOICE_SCRIPT: Record<VoiceScenarioId, VoiceTurn[]> = {
  new: [
    { who: "aria", text: "Thank you for calling Luxe Aesthetics, this is Frontlea. How can I help you today?", delay: 600 },
    { who: "caller", text: "Hi, I was wondering how much you charge for Botox?", delay: 1800 },
    { who: "aria", text: "Of course — our Botox starts at thirteen dollars per unit, with most patients using between twenty and forty units. Are you new to Luxe, or have you been with us before?", delay: 1600 },
    { who: "caller", text: "I'm new. I'd love to try it for my forehead lines.", delay: 1500 },
    { who: "aria", text: "Wonderful. Most first-time forehead treatments are between twenty and thirty units. I have a complimentary consultation with Dr. Patel this Thursday at three thirty, or Friday at eleven — which works better?", delay: 1700 },
    { who: "caller", text: "Thursday at 3:30 works.", delay: 1200 },
    { who: "aria", text: "Perfect, I'm holding Thursday at three thirty with Dr. Patel. Can I grab your full name and a mobile number for the confirmation text?", delay: 1500 },
    { who: "caller", text: "Sarah Reeves, 512-555-4801.", delay: 1400 },
    { who: "aria", text: "Booked. You'll get a text right now with the appointment and our pre-care checklist. We'll see you Thursday, Sarah!", delay: 1500 },
  ],
  "after-hours": [
    { who: "aria", text: "Thanks for calling Luxe Aesthetics — we're closed for the evening, but I can help you book right now. What were you hoping to learn about?", delay: 700 },
    { who: "caller", text: "I saw your Morpheus8 special on Instagram, can I get info?", delay: 1700 },
    { who: "aria", text: "Yes! Our holiday Morpheus8 package is three sessions for twenty-one hundred dollars — typically twenty-seven hundred. Is this for face, neck, or both?", delay: 1600 },
    { who: "caller", text: "Face and neck.", delay: 1100 },
    { who: "aria", text: "Lovely. I have a complimentary consultation tomorrow at ten, or Saturday at one. Which works?", delay: 1500 },
    { who: "caller", text: "Saturday 1pm.", delay: 1000 },
    { who: "aria", text: "Booked. Sending confirmation by text and email now. See you Saturday!", delay: 1300 },
  ],
  reschedule: [
    { who: "aria", text: "Hi Sarah, this is Frontlea from Luxe Aesthetics — I'm calling because we missed you for your three thirty today. I'd love to help you reschedule. Is now a good time?", delay: 700 },
    { who: "caller", text: "Oh shoot, I totally forgot. Yes, I want to reschedule.", delay: 1700 },
    { who: "aria", text: "No problem — these things happen. I have Friday at eleven or Monday at two with Dr. Patel. Any preference?", delay: 1500 },
    { who: "caller", text: "Friday 11am.", delay: 1000 },
    { who: "aria", text: "Done. You'll get a fresh confirmation text, plus a friendly reminder the day before. Thanks Sarah, see you Friday.", delay: 1500 },
  ],
};

export const VOICE_SCENARIOS: { id: VoiceScenarioId; label: string; sub: string }[] = [
  { id: "new", label: "New patient inquiry", sub: "9:42 AM · Tuesday" },
  { id: "after-hours", label: "After‑hours booking", sub: "10:18 PM · Friday" },
  { id: "reschedule", label: "No‑show recovery", sub: "30 min after missed appt" },
];

/** OpenAI TTS voices used by `npm run voice:generate`. */
export const VOICE_BY_ROLE: Record<"aria" | "caller", string> = {
  aria: "shimmer",
  caller: "alloy",
};
