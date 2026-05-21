import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Frontlea — The Front Desk Built for Aesthetic Clinics";
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
            "linear-gradient(180deg, #eef3fb 0%, #dbe5f3 100%)",
          color: "#0c1730",
          fontFamily: "ui-serif, Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#38496b",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          <div
            style={{
              width: 28,
              height: 1,
              background: "#0f2a64",
            }}
          />
          Frontlea — Est. 2026
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
              fontSize: 92,
              lineHeight: 1.02,
              maxWidth: 980,
              letterSpacing: "-0.02em",
            }}
          >
            The front desk that turns missed calls into{" "}
            <span style={{ color: "#0f2a64", fontStyle: "italic" }}>
              booked appointments.
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#38496b",
              maxWidth: 920,
              lineHeight: 1.4,
            }}
          >
            A managed front desk service for med spas, cosmetic dental and plastic surgery.
            Voice, web, IG, no-show recovery — under one roof.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#38496b",
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          <div>Founder-built · &lt; 40 clinics · TX · FL · AZ · NV · SoCal · NY/NJ</div>
          <div style={{ color: "#0f2a64", fontWeight: 600 }}>frontlea.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
