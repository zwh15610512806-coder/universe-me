import { GlassCard } from "@/components/common/GlassCard";
import type { StatItem } from "@/lib/types";

type MetricGridProps = {
  items: StatItem[];
};

export function MetricGrid({ items }: MetricGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <GlassCard key={item.label} className="p-4">
          <div className="text-2xl font-semibold text-white">{item.value}</div>
          <div className="mt-2 text-sm font-medium text-nebula-cyan">{item.label}</div>
          <p className="mt-2 text-xs leading-5 text-slate-400">{item.detail}</p>
        </GlassCard>
      ))}
    </div>
  );
}
