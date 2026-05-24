import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/common/FadeIn";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { featuredExplorations } from "@/lib/mock-data";

export function FeaturedExploration() {
  return (
    <section className="pb-14">
      <SectionHeader
        eyebrow="推荐下一站"
        title="从一个任务、一张图像和一个时间节点继续深入。"
        description="首页第一屏给出路线，这里给出更具体的起点，让探索可以马上进入一个真实页面。"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {featuredExplorations.map((item, index) => (
          <FadeIn key={item.href} delay={index * 0.06}>
            <Link href={item.href} className="group">
              <GlassCard className="flex min-h-56 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium text-nebula-cyan">{item.label}</p>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition group-hover:text-white"
                  />
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              </GlassCard>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
