import DefaultPricingSection from "@/components/sections/pricing/default";
import HeroSectionWithPricing from "@/components/sections/hero/pricing-hero";
export async function generateMetadata() {
  return {
    title: "Fiyatlandırma",
    description: "Fiyatlandırma sayfası",
  };
}
const PricingPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeroSectionWithPricing />
      <div className="w-full flex justify-center -mt-28">
        <div className="container px-3">
          <DefaultPricingSection />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
