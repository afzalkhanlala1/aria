import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import {
  DemoSection,
  CalculatorSection,
  Story,
} from "@/components/sections";
import { Features } from "@/components/features";
import { Timeline } from "@/components/timeline";
import { Pricing } from "@/components/pricing";
import { Proof } from "@/components/proof";
import { FAQ } from "@/components/faq";
import { AuditCTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Story />
        <DemoSection />
        <CalculatorSection />
        <Features />
        <Timeline />
        <Pricing />
        <Proof />
        <FAQ />
        <AuditCTA />
      </main>
      <Footer />
    </>
  );
}
