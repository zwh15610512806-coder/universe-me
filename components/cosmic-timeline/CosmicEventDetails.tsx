import { Radio } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import type { CosmicEvent } from "@/lib/types";

type CosmicEventDetailsProps = {
  event: CosmicEvent | undefined;
};

export function CosmicEventDetails({ event }: CosmicEventDetailsProps) {
  if (!event) {
    return (
      <GlassCard className="p-6">
        <p className="text-sm text-slate-300">暂无可展示内容</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-nebula-violet">{event.epoch}</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{event.title}</h2>
        </div>
        <Radio className="mt-1 text-nebula-cyan" size={22} />
      </div>

      <div className="mt-5 rounded-lg border border-nebula-violet/20 bg-nebula-violet/10 p-4">
        <p className="text-sm font-medium text-white">关键理解</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">{event.keyPoint}</p>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-300">{event.description}</p>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">观测线索</dt>
          <dd className="mt-1 text-slate-200">{event.signal}</dd>
        </div>
        <div>
          <dt className="text-slate-500">物理状态</dt>
          <dd className="mt-1 text-slate-200">{event.temperature}</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-sm font-medium text-white">我们如何知道</p>
        <div className="mt-3 grid gap-2">
          {event.evidence.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
