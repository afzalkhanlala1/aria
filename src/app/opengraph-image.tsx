import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aria — AI Front Desk for Aesthetic Clinics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 18% 12%, rgba(245,185,127,0.18), transparent 55%), linear-gradient(135deg, #0a0814 0%, #16162a 100%)",
          color: "#f4ecd9",
          fontFamily: "ui-serif, Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            color: "#f5b97f",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#f5b97f",
            }}
          />
          Aria · The AI Front Desk
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              maxWidth: 950,
              letterSpacing: "-0.02em",
            }}
          >
            Turn missed calls into{" "}
            <span style={{ color: "#f5b97f", fontStyle: "italic" }}>
              booked appointments.
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#cdc4ae",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            The managed AI receptionist for med spas, cosmetic dental, and plastic surgery.
            Voice, web, IG, no-show recovery — one service.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#cdc4ae",
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          <div>Founder-built · &lt; 40 clinics · TX · FL · AZ · NV · SoCal · NY/NJ</div>
          <div style={{ color: "#f5b97f" }}>aria.work</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
