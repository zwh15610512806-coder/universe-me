import { Telescope } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import type { StarmapHighlight } from "@/lib/types";

type StarmapDetailsProps = {
  stars: StarmapHighlight[];
  selectedStar: StarmapHighlight | undefined;
  onSelectStar: (id: string) => void;
};

export function StarmapDetails({ stars, selectedStar, onSelectStar }: StarmapDetailsProps) {
  if (!selectedStar) {
    return (
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 text-nebula-cyan">
          <Telescope size={18} />
          <p className="text-sm font-medium">暂无可展示天体</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          当前筛选结果为空。切换筛选后可继续查看星图详情。
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-nebula-cyan">{selectedStar.type}</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{selectedStar.name}</h2>
        </div>
        <Telescope className="mt-1 text-nebula-cyan" size={22} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{selectedStar.description}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">距离</dt>
          <dd className="mt-1 text-slate-200">{selectedStar.distance}</dd>
        </div>
        <div>
          <dt className="text-slate-500">视星等</dt>
          <dd className="mt-1 text-slate-200">{selectedStar.magnitude}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-slate-500">观测方向</dt>
          <dd className="mt-1 text-slate-200">{selectedStar.region}</dd>
        </div>
      </dl>
      <div className="mt-5 rounded-lg border border-white/10 bg-space-900/70 p-4">
        <p className="text-sm font-medium text-white">观测提示</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{selectedStar.observation}</p>
      </div>
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-400">当前列表</p>
        <div className="mt-3 grid gap-2">
          {stars.map((star) => (
            <button
              key={star.id}
              type="button"
              aria-label={`查看${star.name}`}
              onClick={() => onSelectStar(star.id)}
              className={[
                "flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm transition",
                selectedStar.id === star.id
                  ? "border-nebula-cyan/50 bg-nebula-cyan/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25"
              ].join(" ")}
            >
              <span>{star.name}</span>
              <span className="shrink-0 text-xs text-slate-500">{star.type}</span>
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
