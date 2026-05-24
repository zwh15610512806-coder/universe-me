import Link from "next/link";
import { ArrowUpRight, Rocket } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHero } from "@/components/common/PageHero";
import { TagList } from "@/components/common/TagList";
import { missionTimeline } from "@/lib/mock-data";

export default function MissionsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
      <PageHero
        eyebrow="人类探索时间线"
        title="那些把边界向外推开的航天任务。"
        description="从近地轨道到月球、火星、外太阳系和深空望远镜，这里用本地模拟数据建立任务年表、详情入口和探索脉络。"
        icon={Rocket}
        tone="cyan"
      >
        <GlassCard className="p-5">
          <p className="text-sm text-slate-400">任务档案</p>
          <div className="mt-3 text-3xl font-semibold text-white">
            {missionTimeline.length} 个任务节点
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            每张任务卡都可以进入详情页，查看目标、载具、目的地和任务成果。
          </p>
        </GlassCard>
      </PageHero>

      <div className="grid gap-4 md:grid-cols-2">
        {missionTimeline.map((mission) => (
          <Link key={mission.slug} href={`/missions/${mission.slug}`} className="group">
            <GlassCard className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-nebula-amber">{mission.year}</div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{mission.name}</h2>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-slate-500 transition group-hover:text-white"
                />
              </div>
              <p className="mt-4 text-sm font-medium text-nebula-cyan">{mission.highlight}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{mission.summary}</p>
              <div className="mt-5">
                <TagList tags={mission.tags} />
              </div>
              <div className="mt-auto grid gap-3 border-t border-white/10 pt-4 text-xs text-slate-400 sm:grid-cols-2">
                <div>
                  <span className="block text-slate-500">机构</span>
                  <span className="mt-1 block text-slate-300">{mission.agency}</span>
                </div>
                <div>
                  <span className="block text-slate-500">范围</span>
                  <span className="mt-1 block text-slate-300">{mission.range}</span>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
