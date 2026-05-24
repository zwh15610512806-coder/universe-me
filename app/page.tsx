import { FeatureGrid } from "@/components/home/FeatureGrid";
import { FeaturedExploration } from "@/components/home/FeaturedExploration";
import { HeroSection } from "@/components/home/HeroSection";
import { MetricGrid } from "@/components/common/MetricGrid";
import { homeStats } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 pt-10 sm:px-8 lg:px-10">
      <HeroSection />
      <section className="pb-12">
        <MetricGrid items={homeStats} />
      </section>
      <FeaturedExploration />
      <FeatureGrid />
    </div>
  );
}
