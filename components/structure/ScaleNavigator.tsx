import { GlassCard } from "@/components/common/GlassCard";
import type { AccentTone, StructureLevel } from "@/lib/types";

type ScaleNavigatorProps = {
  levels: StructureLevel[];
  selectedLevelId: string | null;
  onSelectLevel: (id: string) => void;
};

const accentClassName: Record<AccentTone, string> = {
  cyan: "border-nebula-cyan/60 bg-nebula-cyan/15 text-nebula-cyan",
  violet: "border-nebula-violet/60 bg-nebula-violet/15 text-nebula-violet",
  amber: "border-nebula-amber/60 bg-nebula-amber/15 text-nebula-amber",
  rose: "border-nebula-rose/60 bg-nebula-rose/15 text-nebula-rose"
};

function scaleWidth(value: number) {
  return `${Math.min(100, Math.max(10, value * 8))}%`;
}

export function ScaleNavigator({ levels, selectedLevelId, onSelectLevel }: ScaleNavigatorProps) {
  if (levels.length === 0) {
    return (
      <GlassCard data-visual-target="structure-explorer" className="p-6">
        <p className="text-sm text-slate-300">暂无可展示层级</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard data-visual-target="structure-explorer" className="min-w-0 p-5">
      <div className="hidden space-y-3 lg:block">
        {levels.map((level) => {
          const selected = selectedLevelId === level.id;

          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelectLevel(level.id)}
              className={[
                "w-full rounded-lg border p-4 text-left transition",
                selected
                  ? accentClassName[level.accent]
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25"
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500">{level.order}</span>
                  <h3 className="mt-1 text-lg font-semibold text-white">{level.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{level.scale}</p>
                </div>
                <span className="mt-1 text-xs text-slate-500">10^{level.scaleValue}</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-nebula-amber shadow-[0_0_20px_rgba(247,199,107,0.32)]"
                  style={{ width: scaleWidth(level.scaleValue) }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="lg:hidden">
        <div className="flex min-w-0 gap-3 overflow-x-auto pb-2">
          {levels.map((level) => {
            const selected = selectedLevelId === level.id;

            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onSelectLevel(level.id)}
                className={[
                  "min-w-52 rounded-lg border p-3 text-left transition",
                  selected
                    ? accentClassName[level.accent]
                    : "border-white/10 bg-white/[0.04] text-slate-300"
                ].join(" ")}
              >
                <span className="text-xs">{level.order}</span>
                <span className="mt-2 block text-base font-semibold text-white">{level.name}</span>
                <span className="mt-1 block text-xs text-slate-400">{level.scale}</span>
              </button>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
