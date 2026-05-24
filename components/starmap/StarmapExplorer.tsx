"use client";

import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { StarmapCanvas } from "@/components/starmap/StarmapCanvas";
import { StarmapDetails } from "@/components/starmap/StarmapDetails";
import { StarmapFilters } from "@/components/starmap/StarmapFilters";
import { StarmapLegend } from "@/components/starmap/StarmapLegend";
import type { StarmapHighlight } from "@/lib/types";

type StarmapExplorerProps = {
  stars: StarmapHighlight[];
};

export function StarmapExplorer({ stars }: StarmapExplorerProps) {
  const [activeType, setActiveType] = useState("全部");
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);
  const [selectedStarId, setSelectedStarId] = useState<string | null>(stars[0]?.id ?? null);

  const visibleStars = useMemo(
    () => stars.filter((star) => activeType === "全部" || star.type === activeType),
    [activeType, stars]
  );

  useEffect(() => {
    if (visibleStars.length === 0) {
      setSelectedStarId(null);
      return;
    }

    if (!selectedStarId || !visibleStars.some((star) => star.id === selectedStarId)) {
      setSelectedStarId(visibleStars[0].id);
    }
  }, [selectedStarId, visibleStars]);

  const selectedStar = visibleStars.find((star) => star.id === selectedStarId);

  return (
    <div className="grid min-w-0 gap-4 xl:grid-cols-[260px_minmax(0,1fr)_340px]">
      <GlassCard className="min-w-0 p-5 xl:sticky xl:top-24 xl:self-start">
        <StarmapFilters stars={stars} activeType={activeType} onTypeChange={setActiveType} />
        <div className="mt-6 border-t border-white/10 pt-6">
          <StarmapLegend stars={stars} visibleCount={visibleStars.length} />
        </div>
      </GlassCard>

      <StarmapCanvas
        stars={stars}
        activeType={activeType}
        hoveredStarId={hoveredStarId}
        selectedStarId={selectedStarId}
        onHoverStar={setHoveredStarId}
        onSelectStar={setSelectedStarId}
      />

      <div className="min-w-0 xl:sticky xl:top-24 xl:self-start">
        <StarmapDetails
          stars={visibleStars}
          selectedStar={selectedStar}
          onSelectStar={setSelectedStarId}
        />
      </div>
    </div>
  );
}
