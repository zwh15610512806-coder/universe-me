"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Satellite } from "lucide-react";

export function HeroSection() {
  return (
    <section className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-nebula-cyan">
          <Satellite size={16} />
          沉浸式天文探索
        </div>
        <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
          把可观测宇宙的故事铺成一张星图。
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Cosmos Atlas 将航天任务、宇宙历史、大尺度结构、恒星导航和天文图像汇集到一个清晰的探索界面。
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/starmap"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-nebula-cyan px-5 py-3 text-sm font-semibold text-space-950 transition hover:bg-white"
          >
            打开星图
            <ArrowRight size={17} />
          </Link>
          <Link
            href="/cosmic-timeline"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            浏览宇宙时间线
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="relative mx-auto aspect-square w-full max-w-[520px]"
      >
        <div className="absolute inset-0 rounded-full border border-white/10 bg-radial-orbit shadow-glow" />
        <div className="absolute inset-[12%] rounded-full border border-white/10" />
        <div className="absolute inset-[24%] rounded-full border border-nebula-cyan/20" />
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nebula-amber/90 shadow-[0_0_70px_rgba(247,199,107,0.45)]" />
        <div className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full bg-nebula-cyan shadow-[0_0_24px_rgba(109,229,255,0.9)]" />
        <div className="absolute bottom-[22%] right-[16%] h-4 w-4 rounded-full bg-nebula-violet shadow-[0_0_24px_rgba(167,139,250,0.8)]" />
        <div className="absolute left-[15%] right-[15%] top-1/2 h-px rotate-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 rounded-lg border border-white/10 bg-space-950/55 p-4 shadow-inner-glass backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Compass className="text-nebula-cyan" size={20} />
            <div>
              <p className="text-sm font-medium text-white">宇宙图谱已就绪</p>
              <p className="text-xs text-slate-400">6 个探索入口正在分阶段扩展</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
