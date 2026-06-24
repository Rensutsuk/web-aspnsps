import { getEventsIndexData } from "@/features/events/data";
import { createEventsFeedIcs } from "@/features/events/ical";

export async function GET() {
  const { events } = await getEventsIndexData();
  const ics = createEventsFeedIcs(events);

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="events.ics"',
      "Cache-Control": "no-store",
    },
  });
}
