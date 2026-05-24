import Link from "next/link";
import { Database, Telescope } from "lucide-react";
import { navItems } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-space-950/75 backdrop-blur-2xl">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1.25fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-nebula-cyan/35 bg-nebula-cyan/10 text-nebula-cyan shadow-inner-glass">
              <Telescope size={18} />
            </span>
            <span className="text-base font-semibold text-white">Cosmos Atlas</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            一个使用本地 mock
            数据构建的中文宇宙探索网站，聚合航天任务、宇宙历史、结构层级、交互星图和天文图像库。
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-400">
            <Database size={14} className="text-nebula-amber" />
            当前阶段：本地数据驱动，无后端连接
          </div>
        </div>

        <div>
          <p className="text-sm tracking-[0.28em] text-nebula-cyan">站点地图</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 outline-none transition hover:border-nebula-cyan/30 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-nebula-cyan/30"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
