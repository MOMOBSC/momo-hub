import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LearningHub from "@/components/LearningHub";
import AiChat from "@/components/AiChat";
import NfaVerification from "@/components/NfaVerification";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSection />
    <LearningHub />
    <AiChat />
    <NfaVerification />
    <Resources />
    <Footer />
  </div>
);

export default Index;
