import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { homeFeatures } from "@/lib/mock-data";

export function FeatureGrid() {
  return (
    <section className="pb-10" data-visual-target="home-route-index">
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm tracking-[0.28em] text-nebula-cyan">完整路线索引</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            选择一种方式继续进入宇宙。
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          每个入口都使用本地 mock 数据支撑，后续可以继续扩展为更完整的天文档案和交互工具。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {homeFeatures.map((feature) => {
          const Icon = feature.icon;

          return (
            <Link key={feature.href} href={feature.href} className="group">
              <GlassCard className="flex h-full min-h-64 flex-col p-5 transition group-hover:border-nebula-cyan/30 group-hover:bg-white/[0.07]">
                <div className="mb-8 flex items-start justify-between">
                  <span className={`rounded-lg border p-3 ${feature.iconTone}`}>
                    <Icon size={22} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition group-hover:text-white"
                  />
                </div>
                <div className="mt-auto">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    {feature.kicker}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
