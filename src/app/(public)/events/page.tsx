import type { Metadata } from "next";

import { EventsIndexPage } from "@/components/events/EventsIndexPage";
import { getEventsIndexData } from "@/features/events/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming parish events and activities with a calendar view and iCal export.",
  alternates: {
    canonical: "/events",
  },
};

export default async function EventsRoute() {
  const data = await getEventsIndexData();
  return <EventsIndexPage data={data} />;
}
