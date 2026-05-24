import { ChevronLeft, ChevronRight } from "lucide-react";

type TimelineControlsProps = {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function TimelineControls({
  currentIndex,
  total,
  onPrevious,
  onNext
}: TimelineControlsProps) {
  const hasItems = total > 0;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-400">
        {hasItems ? `第 ${currentIndex + 1} / ${total} 阶段` : "暂无阶段"}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasItems || currentIndex === 0}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200 transition hover:border-nebula-violet/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          上一阶段
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasItems || currentIndex >= total - 1}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200 transition hover:border-nebula-cyan/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一阶段
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
