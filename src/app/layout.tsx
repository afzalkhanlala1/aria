import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ThemeProvider, themeBootScript } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://aria.work";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aria — AI Front Desk for Aesthetic Clinics",
    template: "%s · Aria",
  },
  description:
    "The managed AI receptionist that answers every call, every DM, every after-hours lead — and books them into your real scheduler. Built for med spas, cosmetic dental, and plastic surgery practices.",
  keywords: [
    "AI front desk",
    "AI receptionist",
    "med spa AI",
    "aesthetic clinic AI",
    "voice AI clinic",
    "missed call AI",
    "Boulevard integration",
    "Aesthetic Record integration",
    "Mangomint integration",
  ],
  authors: [{ name: "Afzal Khan" }],
  creator: "Afzal Khan",
  publisher: "Aria",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aria — AI Front Desk for Aesthetic Clinics",
    description:
      "Stop losing $40,000+ a year to missed calls. Aria's managed AI front desk answers, qualifies, and books every lead — 24/7.",
    type: "website",
    url: SITE_URL,
    siteName: "Aria",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aria — AI Front Desk for Aesthetic Clinics",
    description:
      "Answer every call. Book every lead. Done-for-you AI receptionist for aesthetic clinics.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4ecdb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0814" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aria",
  description:
    "Managed AI front desk for aesthetic clinics — voice, web, IG, no-show recovery, and database reactivation, in one service.",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  email: "ariapersonalagent@gmail.com",
  telephone: "+1-816-859-9999",
  founder: { "@type": "Person", name: "Afzal Khan" },
  areaServed: ["TX", "FL", "AZ", "NV", "California", "NY", "NJ"],
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+1-816-859-9999",
      email: "ariapersonalagent@gmail.com",
      availableLanguage: ["English"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-bg text-ink">
        <ThemeProvider>
          <div className="page-grid relative flex min-h-screen flex-col">
            <Nav />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
