import { ScanSearch } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import type { StructureLevel } from "@/lib/types";

type StructureDetailsProps = {
  level: StructureLevel | undefined;
};

export function StructureDetails({ level }: StructureDetailsProps) {
  if (!level) {
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
          <p className="text-sm font-medium text-nebula-amber">层级 {level.order}</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{level.name}</h2>
        </div>
        <ScanSearch className="mt-1 text-nebula-amber" size={22} />
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-300">{level.description}</p>

      <dl className="mt-5 grid gap-3 text-sm">
        <div>
          <dt className="text-slate-500">尺度范围</dt>
          <dd className="mt-1 text-slate-200">{level.scale}</dd>
        </div>
        <div>
          <dt className="text-slate-500">主导问题</dt>
          <dd className="mt-1 text-slate-200">{level.dominantForce}</dd>
        </div>
        <div>
          <dt className="text-slate-500">观测方式</dt>
          <dd className="mt-1 text-slate-200">{level.observation}</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-sm font-medium text-white">代表对象</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {level.examples.map((example) => (
            <span
              key={example}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
            >
              {example}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
