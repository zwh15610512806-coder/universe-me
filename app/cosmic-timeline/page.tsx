import { Sparkles } from "lucide-react";
import { CosmicTimelineExplorer } from "@/components/cosmic-timeline/CosmicTimelineExplorer";
import { FadeIn } from "@/components/common/FadeIn";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cosmicEvents, cosmicInsights } from "@/lib/mock-data";

export default function CosmicTimelinePage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <PageHero
        eyebrow="宇宙历史时间线"
        title="沿着光的延迟阅读宇宙历史。"
        description="Cosmos Atlas 用本地模拟深时数据组织关键阶段，让时间节点、观测证据和物理状态在同一个交互视图中关联起来。"
        icon={Sparkles}
        tone="violet"
      >
        <GlassCard className="p-5">
          <p className="text-sm text-slate-400">时间跨度</p>
          <div className="mt-3 text-3xl font-semibold text-white">138 亿年</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            这里不是精确宇宙学计算器，而是面向探索体验的信息地图。
          </p>
        </GlassCard>
      </PageHero>

      <CosmicTimelineExplorer events={cosmicEvents} />

      <section className="mt-16">
        <SectionHeader
          eyebrow="理解框架"
          title="读懂宇宙时间线的三个入口。"
          description="时间线不只是年份排列，更重要的是理解光、结构和观测波段之间的关系。"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {cosmicInsights.map((insight, index) => (
            <FadeIn key={insight.title} delay={index * 0.06}>
              <GlassCard className="h-full p-6">
                <div className="text-sm font-medium text-nebula-violet">{insight.metric}</div>
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
