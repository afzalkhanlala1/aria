import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Aria — AI Front Desk for Aesthetic Clinics",
  description:
    "The AI receptionist that answers every call, every DM, every after-hours lead — and books them into your schedule. Built for med spas, cosmetic dental, and plastic surgery practices.",
  openGraph: {
    title: "Aria — AI Front Desk for Aesthetic Clinics",
    description:
      "Stop losing $40,000+ a year to missed calls. Aria's managed AI front desk answers, qualifies, and books every lead — 24/7.",
    type: "website",
  },
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
      </head>
      <body className="min-h-full bg-bg text-ink">
        <ThemeProvider>
          <div className="page-grid relative flex min-h-screen flex-col">
            <Nav />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
