"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Orbit, Sparkles } from "lucide-react";
import { JourneyRouteMap } from "@/components/home/JourneyRouteMap";
import { homeHeroSpotlight, homeJourneyRoutes } from "@/lib/mock-data";

export function HeroSection() {
  return (
    <section
      className="relative isolate -mx-5 min-h-[calc(100vh-4rem)] overflow-hidden px-5 pb-12 pt-16 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10 lg:pb-16 lg:pt-20"
      data-visual-target="home-hero"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(109,229,255,0.18),transparent_30%),radial-gradient(circle_at_72%_24%,rgba(167,139,250,0.16),transparent_28%),radial-gradient(circle_at_52%_78%,rgba(247,199,107,0.12),transparent_32%),linear-gradient(180deg,rgba(3,4,11,0.28),#03040b_82%)]" />
      <div className="cosmic-grid absolute inset-0 -z-10 opacity-70" />
      <div className="absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/10 bg-radial-orbit opacity-70 blur-sm" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-space-950 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl pt-8 lg:pb-8"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-nebula-cyan shadow-inner-glass backdrop-blur-xl">
            <Sparkles size={16} />
            宇宙旅程入口
          </div>
          <p className="text-sm font-semibold tracking-[0.34em] text-slate-400">
            Cosmos Atlas
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            沿着光、时间和尺度进入可观测宇宙。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            从人类探索、宇宙历史、结构层级、交互星图到天文图像库，Cosmos Atlas
            把深空知识组织成一条清晰的中文探索路线。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/starmap"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-nebula-cyan px-5 py-3 text-sm font-semibold text-space-950 outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-nebula-cyan/50"
            >
              打开交互星图
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/cosmic-timeline"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30"
            >
              浏览宇宙时间线
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
          className="min-w-0"
        >
          <div className="mb-4 flex items-center gap-3 text-sm text-slate-400">
            <Orbit size={17} className="text-nebula-amber" />
            六个探索入口按旅程顺序展开
          </div>
          <JourneyRouteMap routes={homeJourneyRoutes} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
        className="mx-auto mt-8 w-full max-w-7xl"
      >
        <Link
          href={homeHeroSpotlight.href}
          className="group grid gap-4 rounded-lg border border-white/10 bg-space-950/55 p-5 shadow-inner-glass outline-none backdrop-blur-xl transition hover:border-nebula-cyan/40 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-nebula-cyan/30 lg:grid-cols-[1fr_auto]"
          data-visual-target="home-spotlight"
        >
          <div>
            <p className="text-sm font-medium text-nebula-cyan">{homeHeroSpotlight.label}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {homeHeroSpotlight.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              {homeHeroSpotlight.description}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[25rem]">
            {homeHeroSpotlight.metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
