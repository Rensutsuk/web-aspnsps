import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetailPage } from "@/components/events/EventDetailPage";
import { getEventBySlug } from "@/features/events/data";

type EventRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

function resolveSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
}

export async function generateMetadata({ params }: EventRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  const url = `${resolveSiteUrl()}/events/${event.slug}`;
  const description = event.location ? `${event.title} • ${event.location}` : event.title;

  return {
    title: event.title,
    description,
    alternates: {
      canonical: `/events/${event.slug}`,
    },
    openGraph: {
      title: event.title,
      description,
      type: "article",
      url,
      images: event.coverImage
        ? [
            {
              url: event.coverImage,
              alt: event.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: event.coverImage ? [event.coverImage] : undefined,
    },
  };
}

export default async function EventRoute({ params }: EventRouteProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} />;
}
