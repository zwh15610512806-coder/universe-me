import { FeatureGrid } from "@/components/home/FeatureGrid";
import { FeaturedExploration } from "@/components/home/FeaturedExploration";
import { HeroSection } from "@/components/home/HeroSection";
import { MetricGrid } from "@/components/common/MetricGrid";
import { homeStats } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <HeroSection />
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 sm:px-8 lg:px-10">
        <section className="pb-12 pt-10">
          <MetricGrid items={homeStats} />
        </section>
        <FeaturedExploration />
        <FeatureGrid />
      </div>
    </div>
  );
}
