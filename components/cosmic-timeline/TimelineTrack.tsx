import { GlassCard } from "@/components/common/GlassCard";
import type { AccentTone, CosmicEvent } from "@/lib/types";

type TimelineTrackProps = {
  events: CosmicEvent[];
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;
};

const accentClassName: Record<AccentTone, string> = {
  cyan: "border-nebula-cyan/60 bg-nebula-cyan/15 text-nebula-cyan",
  violet: "border-nebula-violet/60 bg-nebula-violet/15 text-nebula-violet",
  amber: "border-nebula-amber/60 bg-nebula-amber/15 text-nebula-amber",
  rose: "border-nebula-rose/60 bg-nebula-rose/15 text-nebula-rose"
};

function clampPosition(value: number) {
  return Math.min(94, Math.max(6, value));
}

export function TimelineTrack({ events, selectedEventId, onSelectEvent }: TimelineTrackProps) {
  if (events.length === 0) {
    return (
      <GlassCard data-visual-target="cosmic-timeline-explorer" className="p-6">
        <p className="text-sm text-slate-300">暂无可展示时间节点</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard data-visual-target="cosmic-timeline-explorer" className="min-w-0 p-5">
      <div className="hidden min-h-[360px] lg:block">
        <div className="relative h-full min-h-[320px] rounded-lg border border-white/10 bg-space-950/60 p-6">
          <div className="absolute left-8 right-8 top-1/2 h-px bg-white/15" />
          <div className="absolute left-8 top-1/2 h-px w-[28%] bg-nebula-violet/50 shadow-[0_0_28px_rgba(167,139,250,0.35)]" />
          <div className="absolute right-8 top-1/2 h-px w-[26%] bg-nebula-cyan/40 shadow-[0_0_28px_rgba(109,229,255,0.24)]" />

          {events.map((event, index) => {
            const selected = selectedEventId === event.id;
            const top = index % 2 === 0 ? "top-[18%]" : "bottom-[18%]";

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => onSelectEvent(event.id)}
                className={[
                  "absolute w-44 -translate-x-1/2 rounded-lg border p-3 text-left transition",
                  top,
                  selected
                    ? accentClassName[event.accent]
                    : "border-white/10 bg-white/[0.04] text-slate-300 opacity-75 hover:border-white/25 hover:opacity-100"
                ].join(" ")}
                style={{ left: `${clampPosition(event.relativePosition)}%` }}
              >
                <span className="block text-xs">{event.epoch}</span>
                <span className="mt-2 block text-sm font-semibold text-white">{event.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex min-w-0 gap-3 overflow-x-auto pb-2">
          {events.map((event) => {
            const selected = selectedEventId === event.id;

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => onSelectEvent(event.id)}
                className={[
                  "min-w-48 rounded-lg border p-3 text-left transition",
                  selected
                    ? accentClassName[event.accent]
                    : "border-white/10 bg-white/[0.04] text-slate-300"
                ].join(" ")}
              >
                <span className="block text-xs">{event.epoch}</span>
                <span className="mt-2 block text-sm font-semibold text-white">{event.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
