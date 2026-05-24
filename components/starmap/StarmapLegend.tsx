import type { StarmapColor, StarmapHighlight } from "@/lib/types";

type StarmapLegendProps = {
  stars: StarmapHighlight[];
  visibleCount: number;
};

const colorClassName: Record<StarmapColor, string> = {
  cyan: "bg-nebula-cyan",
  violet: "bg-nebula-violet",
  amber: "bg-nebula-amber",
  rose: "bg-nebula-rose",
  white: "bg-white"
};

export function StarmapLegend({ stars, visibleCount }: StarmapLegendProps) {
  const legend = stars.reduce<Record<string, StarmapColor>>((acc, star) => {
    acc[star.type] = star.color;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-400">当前可见</p>
        <p className="mt-1 text-3xl font-semibold text-white">{visibleCount}</p>
      </div>
      <div className="space-y-2">
        {Object.entries(legend).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2 text-sm text-slate-300">
            <span
              className={[
                "h-2.5 w-2.5 rounded-full shadow-[0_0_18px_currentColor]",
                colorClassName[color]
              ].join(" ")}
            />
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}
