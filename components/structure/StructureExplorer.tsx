"use client";

import { useEffect, useMemo, useState } from "react";
import { ScaleControls } from "@/components/structure/ScaleControls";
import { ScaleNavigator } from "@/components/structure/ScaleNavigator";
import { StructureDetails } from "@/components/structure/StructureDetails";
import type { StructureLevel } from "@/lib/types";

type StructureExplorerProps = {
  levels: StructureLevel[];
};

export function StructureExplorer({ levels }: StructureExplorerProps) {
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(levels[0]?.id ?? null);

  useEffect(() => {
    if (levels.length === 0) {
      setSelectedLevelId(null);
      return;
    }

    if (!selectedLevelId || !levels.some((level) => level.id === selectedLevelId)) {
      setSelectedLevelId(levels[0].id);
    }
  }, [levels, selectedLevelId]);

  const currentIndex = useMemo(
    () => Math.max(0, levels.findIndex((level) => level.id === selectedLevelId)),
    [levels, selectedLevelId]
  );
  const selectedLevel = levels[currentIndex];

  return (
    <section data-visual-target="structure-shell" className="min-w-0 space-y-4">
      <ScaleControls
        currentIndex={currentIndex}
        total={levels.length}
        onPrevious={() => {
          if (currentIndex > 0) {
            setSelectedLevelId(levels[currentIndex - 1].id);
          }
        }}
        onNext={() => {
          if (currentIndex < levels.length - 1) {
            setSelectedLevelId(levels[currentIndex + 1].id);
          }
        }}
      />
      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <ScaleNavigator
          levels={levels}
          selectedLevelId={selectedLevelId}
          onSelectLevel={setSelectedLevelId}
        />
        <StructureDetails level={selectedLevel} />
      </div>
    </section>
  );
}
