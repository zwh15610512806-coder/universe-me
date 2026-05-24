import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Rocket } from "lucide-react";
import { ContentMeta } from "@/components/common/ContentMeta";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHero } from "@/components/common/PageHero";
import { TagList } from "@/components/common/TagList";
import { missionTimeline } from "@/lib/mock-data";

type MissionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function findMission(slug: string) {
  return missionTimeline.find((mission) => mission.slug === slug);
}

export function generateStaticParams() {
  return missionTimeline.map((mission) => ({ slug: mission.slug }));
}

export async function generateMetadata({
  params
}: MissionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mission = findMission(slug);

  if (!mission) {
    return {
      title: "任务未找到 | Cosmos Atlas"
    };
  }

  return {
    title: `${mission.name} | Cosmos Atlas`,
    description: mission.summary
  };
}

export default async function MissionDetailPage({ params }: MissionDetailPageProps) {
  const { slug } = await params;
  const mission = findMission(slug);

  if (!mission) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
      <Link
        href="/missions"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        返回人类探索时间线
      </Link>

      <PageHero
        eyebrow={`${mission.year} / ${mission.phase}`}
        title={mission.name}
        description={mission.summary}
        icon={Rocket}
        tone="cyan"
      >
        <GlassCard className="p-5">
          <p className="text-sm text-slate-400">任务成果</p>
          <p className="mt-3 text-lg leading-7 text-white">{mission.outcome}</p>
        </GlassCard>
      </PageHero>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-6">
          <h2 className="text-2xl font-semibold text-white">任务摘要</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{mission.objective}</p>
          <div className="mt-6">
            <TagList tags={mission.tags} />
          </div>
        </GlassCard>

        <ContentMeta
          items={[
            { label: "执行机构", value: mission.agency },
            { label: "目的地", value: mission.destination },
            { label: "运载系统", value: mission.vehicle },
            { label: "任务范围", value: mission.range },
            { label: "持续时间", value: mission.duration },
            ...mission.details
          ]}
        />
      </div>
    </section>
  );
}
