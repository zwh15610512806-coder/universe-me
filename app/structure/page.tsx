import { Orbit } from "lucide-react";
import { FadeIn } from "@/components/common/FadeIn";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StructureExplorer } from "@/components/structure/StructureExplorer";
import { structureInsights, structureLevels } from "@/lib/mock-data";

export default function StructurePage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <PageHero
        eyebrow="宇宙结构层级"
        title="在尺度跳跃中重新理解宇宙。"
        description="Cosmos Atlas 用本地模拟尺度数据串联行星、恒星系统、星系、星系团和宇宙网，帮助你按层级查看对象、尺度和观测方式。"
        icon={Orbit}
        tone="amber"
      >
        <GlassCard className="p-5">
          <p className="text-sm text-slate-400">尺度跳跃</p>
          <div className="mt-3 text-3xl font-semibold text-white">10^20+</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            这里使用相对尺度展示层级关系，不做精确物理换算。
          </p>
        </GlassCard>
      </PageHero>

      <StructureExplorer levels={structureLevels} />

      <section className="mt-16">
        <SectionHeader
          eyebrow="尺度解释"
          title="结构层级背后的三个关键判断。"
          description="尺度扩大时，主导问题会从局部环境转向统计结构、暗物质和演化历史。"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {structureInsights.map((insight, index) => (
            <FadeIn key={insight.title} delay={index * 0.06}>
              <GlassCard className="h-full p-6">
                <div className="text-sm font-medium text-nebula-amber">{insight.metric}</div>
                <h2 className="mt-4 text-xl font-semibold text-white">{insight.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{insight.description}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </section>
    </section>
  );
}
