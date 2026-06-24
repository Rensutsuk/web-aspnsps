import { cache } from "react";

import { prisma } from "@/lib/prisma";
import type { EventDetail, EventsIndexData, EventSummary } from "@/features/events/types";

type PublishedEventRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string | null;
  startAt: Date;
  endAt: Date | null;
  coverImage: string | null;
  blogPostSlug: string | null;
  published: boolean;
};

type PublishedEventDetailRecord = PublishedEventRecord & {
  blogPost: { title: string } | null;
};

function mapEvent(record: PublishedEventRecord): EventSummary {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    description: record.description,
    location: record.location,
    startAt: record.startAt.toISOString(),
    endAt: record.endAt?.toISOString() ?? null,
    coverImage: record.coverImage,
    blogPostSlug: record.blogPostSlug,
  };
}

async function safeQuery<T>(operation: () => Promise<T>, fallback: T) {
  try {
    return await operation();
  } catch (error) {
    console.error("Events query failed", error);
    return fallback;
  }
}

const getPublishedEventRecords = cache(async () => {
  const records = await safeQuery(
    () =>
      prisma.event.findMany({
        where: { published: true },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          location: true,
          startAt: true,
          endAt: true,
          coverImage: true,
          blogPostSlug: true,
          published: true,
        },
        orderBy: [{ startAt: "asc" }, { updatedAt: "desc" }],
      }) as Promise<PublishedEventRecord[]>,
    [] as PublishedEventRecord[],
  );

  return records.map(mapEvent);
});

export async function getEventsIndexData(): Promise<EventsIndexData> {
  const events = await getPublishedEventRecords();
  return { events };
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const record = await safeQuery(
    () =>
      prisma.event.findUnique({
        where: { slug },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          location: true,
          startAt: true,
          endAt: true,
          coverImage: true,
          blogPostSlug: true,
          published: true,
          blogPost: { select: { title: true } },
        },
      }) as Promise<PublishedEventDetailRecord | null>,
    null,
  );

  if (!record || !record.published) {
    return null;
  }

  return {
    ...mapEvent(record),
    blogPostTitle: record.blogPost?.title ?? null,
  };
}
