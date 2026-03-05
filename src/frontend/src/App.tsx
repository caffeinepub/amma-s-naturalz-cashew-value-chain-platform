import CalculatorsSection from "@/components/CalculatorsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import GovernmentSchemesSection from "@/components/GovernmentSchemesSection";
import HeroSection from "@/components/HeroSection";
import IndustrySolutionsSection from "@/components/IndustrySolutionsSection";
import InvestorInsightsSection from "@/components/InvestorInsightsSection";
import InvestorPitchSection from "@/components/InvestorPitchSection";
import KernelGradesSection from "@/components/KernelGradesSection";
import MarketGuideSection from "@/components/MarketGuideSection";
import MarketIntelligenceSection from "@/components/MarketIntelligenceSection";
import Navigation from "@/components/Navigation";
import OpportunitySection from "@/components/OpportunitySection";
import OriginsSection from "@/components/OriginsSection";
import ProcessingSection from "@/components/ProcessingSection";
import ValueChainSection from "@/components/ValueChainSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Toaster richColors position="top-right" />
      <Navigation />

      <main>
        <HeroSection />
        <OpportunitySection />
        <ValueChainSection />
        <ProcessingSection />
        <KernelGradesSection />
        <IndustrySolutionsSection />
        <CalculatorsSection />
        <OriginsSection />
        <InvestorInsightsSection />
        <GovernmentSchemesSection />
        <InvestorPitchSection />
        <MarketIntelligenceSection />
        <MarketGuideSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
