import Link from "next/link";
import { Telescope } from "lucide-react";
import { navItems } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-space-950/60 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-nebula-cyan/40 bg-nebula-cyan/10 text-nebula-cyan">
              <Telescope size={18} />
            </span>
            <span className="text-base font-semibold text-white">Cosmos Atlas</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            一个使用本地模拟数据构建的中文宇宙探索站，聚合航天任务、宇宙历史、结构层级、星图和图像库。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-nebula-cyan/30 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
