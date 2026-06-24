import { getEventBySlug } from "@/features/events/data";
import { createSingleEventIcs } from "@/features/events/ical";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await context.params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return new Response("Event not found", { status: 404 });
  }

  const ics = createSingleEventIcs(event);

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
