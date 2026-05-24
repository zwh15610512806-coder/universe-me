import type { StarmapHighlight } from "@/lib/types";

type StarmapFiltersProps = {
  stars: StarmapHighlight[];
  activeType: string;
  onTypeChange: (type: string) => void;
};

export function StarmapFilters({ stars, activeType, onTypeChange }: StarmapFiltersProps) {
  const counts = stars.reduce<Record<string, number>>((acc, star) => {
    acc[star.type] = (acc[star.type] ?? 0) + 1;
    return acc;
  }, {});
  const types = Object.keys(counts);

  return (
    <div>
      <p className="text-sm font-medium text-slate-400">筛选天体类型</p>
      <div className="mt-3 flex min-w-0 gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        <button
          type="button"
          onClick={() => onTypeChange("全部")}
          className={[
            "shrink-0 rounded-full border px-4 py-2 text-sm transition",
            activeType === "全部"
              ? "border-nebula-cyan/60 bg-nebula-cyan/15 text-nebula-cyan"
              : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25"
          ].join(" ")}
        >
          全部 · {stars.length}
        </button>
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onTypeChange(type)}
            className={[
              "shrink-0 rounded-full border px-4 py-2 text-sm transition",
              activeType === type
                ? "border-nebula-cyan/60 bg-nebula-cyan/15 text-nebula-cyan"
                : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25"
            ].join(" ")}
          >
            {type} · {counts[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
