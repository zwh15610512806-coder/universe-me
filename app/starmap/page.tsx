import { Crosshair } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHero } from "@/components/common/PageHero";
import { StarmapExplorer } from "@/components/starmap/StarmapExplorer";
import { starmapHighlights } from "@/lib/mock-data";

export default function StarmapPage() {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-8 lg:px-10">
      <PageHero
        eyebrow="交互星图"
        title="在可旋转的近邻星域中选择目标。"
        description="Cosmos Atlas 先用本地模拟星表搭建交互骨架：筛选天体类型、旋转星域、点击星点，并在详情面板中阅读观测线索。"
        icon={Crosshair}
        tone="cyan"
      >
        <GlassCard className="p-5">
          <p className="text-sm text-slate-400">当前星图样本</p>
          <div className="mt-3 text-3xl font-semibold text-white">{starmapHighlights.length} 个目标</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            坐标为界面模拟数据，用来验证筛选、选中和 3D 空间布局，不代表真实天球坐标。
          </p>
        </GlassCard>
      </PageHero>

      <StarmapExplorer stars={starmapHighlights} />
    </section>
  );
}
