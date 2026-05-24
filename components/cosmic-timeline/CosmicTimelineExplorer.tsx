"use client";

import { useEffect, useMemo, useState } from "react";
import { CosmicEventDetails } from "@/components/cosmic-timeline/CosmicEventDetails";
import { TimelineControls } from "@/components/cosmic-timeline/TimelineControls";
import { TimelineTrack } from "@/components/cosmic-timeline/TimelineTrack";
import type { CosmicEvent } from "@/lib/types";

type CosmicTimelineExplorerProps = {
  events: CosmicEvent[];
};

export function CosmicTimelineExplorer({ events }: CosmicTimelineExplorerProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(events[0]?.id ?? null);

  useEffect(() => {
    if (events.length === 0) {
      setSelectedEventId(null);
      return;
    }

    if (!selectedEventId || !events.some((event) => event.id === selectedEventId)) {
      setSelectedEventId(events[0].id);
    }
  }, [events, selectedEventId]);

  const currentIndex = useMemo(
    () => Math.max(0, events.findIndex((event) => event.id === selectedEventId)),
    [events, selectedEventId]
  );
  const selectedEvent = events[currentIndex];

  return (
    <section data-visual-target="cosmic-timeline-shell" className="min-w-0 space-y-4">
      <TimelineControls
        currentIndex={currentIndex}
        total={events.length}
        onPrevious={() => {
          if (currentIndex > 0) {
            setSelectedEventId(events[currentIndex - 1].id);
          }
        }}
        onNext={() => {
          if (currentIndex < events.length - 1) {
            setSelectedEventId(events[currentIndex + 1].id);
          }
        }}
      />
      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <TimelineTrack
          events={events}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
        />
        <CosmicEventDetails event={selectedEvent} />
      </div>
    </section>
  );
}
