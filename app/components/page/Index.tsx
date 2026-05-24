import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import ClientsSection from "@/app/components/ClientsSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import ReviewsSection from "@/app/components/ReviewsSection";
import TossPaymentsFeeSection from "@/app/components/TossPaymentsFeeSection";
import PricingSection from "@/app/components/PricingSection";
import PlanComparisonSection from "@/app/components/PlanComparisonSection";
import OnboardingSection from "@/app/components/OnboardingSection";
import InquirySection from "@/app/components/InquirySection";
import FaqSection from "@/app/components/FaqSection";
import Footer from "@/app/components/Footer";

export default function Index() {
  return (
    <main className="bg-[#0b0e14]">
      <Header />
      <HeroSection />
      <ClientsSection />
      <FeaturesSection />
      <ReviewsSection />
      <TossPaymentsFeeSection />
      <PricingSection />
      <PlanComparisonSection />
      <OnboardingSection />
      <InquirySection />
      <FaqSection />
      <Footer />
    </main>
  );
}
