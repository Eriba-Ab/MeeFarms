import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutSummary from "@/components/AboutSummary";
import FeaturedProducts from "@/components/FeaturedProducts";
import VideoFeature from "@/components/VideoFeature";
import CTABanner from "@/components/CTABanner";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="font-body">
      <Hero />
      <AboutSummary />
      <FeaturedProducts />
      <VideoFeature />
      <CTABanner />
      <NewsletterSection />
    </div>
  );
};

export default Index;
