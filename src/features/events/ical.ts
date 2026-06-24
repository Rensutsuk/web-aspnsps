import { siteConfig } from "@/lib/siteConfig";
import type { EventDetail, EventSummary } from "@/features/events/types";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatUtcDateTime(date: Date) {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function escapeIcsText(input: string) {
  return input
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .trim();
}

function foldLine(line: string, limit = 74) {
  if (line.length <= limit) {
    return line;
  }

  const parts: string[] = [];
  let index = 0;
  while (index < line.length) {
    const slice = line.slice(index, index + limit);
    parts.push(index === 0 ? slice : ` ${slice}`);
    index += limit;
  }

  return parts.join("\r\n");
}

function buildEventLines(event: {
  uid: string;
  title: string;
  description: string;
  location?: string | null;
  url: string;
  startAt: Date;
  endAt: Date;
  dtStamp: Date;
}) {
  const lines = [
    "BEGIN:VEVENT",
    `UID:${escapeIcsText(event.uid)}`,
    `DTSTAMP:${formatUtcDateTime(event.dtStamp)}`,
    `DTSTART:${formatUtcDateTime(event.startAt)}`,
    `DTEND:${formatUtcDateTime(event.endAt)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    event.location ? `LOCATION:${escapeIcsText(event.location)}` : null,
    `URL:${escapeIcsText(event.url)}`,
    "END:VEVENT",
  ].filter(Boolean) as string[];

  return lines.map((line) => foldLine(line)).join("\r\n");
}

export function createSingleEventIcs(event: EventDetail) {
  const now = new Date();
  const startAt = new Date(event.startAt);
  const endAt = event.endAt ? new Date(event.endAt) : new Date(startAt.getTime() + 60 * 60 * 1000);
  const url = `${siteConfig.siteUrl}/events/${event.slug}`;

  const vevent = buildEventLines({
    uid: `${event.id}@aspnsps`,
    title: event.title,
    description: event.description,
    location: event.location,
    url,
    startAt,
    endAt,
    dtStamp: now,
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ASPNSPS//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    vevent,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function createEventsFeedIcs(events: EventSummary[]) {
  const now = new Date();
  const header = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ASPNSPS//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText("ASPNSPS Events")}`,
    `X-WR-CALDESC:${escapeIcsText("Upcoming parish events from ASPNSPS.")}`,
  ].map((line) => foldLine(line));

  const vevents = events
    .map((event) => {
      const startAt = new Date(event.startAt);
      const endAt = event.endAt ? new Date(event.endAt) : new Date(startAt.getTime() + 60 * 60 * 1000);
      const url = `${siteConfig.siteUrl}/events/${event.slug}`;

      return buildEventLines({
        uid: `${event.id}@aspnsps`,
        title: event.title,
        description: event.description,
        location: event.location,
        url,
        startAt,
        endAt,
        dtStamp: now,
      });
    })
    .join("\r\n");

  return [...header, vevents, "END:VCALENDAR", ""].join("\r\n");
}
