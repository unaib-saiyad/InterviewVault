import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ValueSection } from "@/components/landing/ValueSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection/>
        <FeaturesSection />
        <HowItWorks />
        <ValueSection/>
        <CTASection/>
      </main>
      <Footer/>
    </div>
  );
}
