import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomeJourneyRoute } from "@/lib/types";

const accentClassMap: Record<HomeJourneyRoute["accent"], string> = {
  cyan: "border-nebula-cyan/35 bg-nebula-cyan/10 text-nebula-cyan",
  violet: "border-nebula-violet/35 bg-nebula-violet/10 text-nebula-violet",
  amber: "border-nebula-amber/35 bg-nebula-amber/10 text-nebula-amber",
  rose: "border-nebula-rose/35 bg-nebula-rose/10 text-nebula-rose"
};

type JourneyRouteMapProps = {
  routes: HomeJourneyRoute[];
};

export function JourneyRouteMap({ routes }: JourneyRouteMapProps) {
  return (
    <div
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      data-visual-target="home-journey-routes"
    >
      {routes.map((route, index) => {
        const Icon = route.icon;

        return (
          <Link
            key={route.href}
            href={route.href}
            className="group relative min-h-32 overflow-hidden rounded-lg border border-white/10 bg-space-950/45 p-4 shadow-inner-glass outline-none backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] focus-visible:border-nebula-cyan focus-visible:ring-2 focus-visible:ring-nebula-cyan/30"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${accentClassMap[route.accent]}`}
              >
                <Icon size={18} />
              </span>
              <span className="text-xs text-slate-500">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-5">
              <p className="text-xs tracking-[0.22em] text-slate-500">{route.eyebrow}</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{route.label}</h3>
                <ArrowUpRight
                  size={16}
                  className="text-slate-500 transition group-hover:text-white"
                />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{route.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
