import LandingNav from "../components/landing/LandingNav";
import HeroSection from "../components/landing/HeroSection";
import SocialProofStrip from "../components/landing/SocialProofStrip";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import ScenarioSection from "../components/landing/ScenarioSection";
import FinalCTASection from "../components/landing/FinalCTASection";
import LandingFooter from "../components/landing/LandingFooter";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <LandingNav />
      <HeroSection />
      <SocialProofStrip />
      <HowItWorksSection />
      <FeaturesSection />
      <ScenarioSection />
      <FinalCTASection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
