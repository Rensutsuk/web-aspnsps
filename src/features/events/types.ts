export type EventSummary = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string | null;
  startAt: string;
  endAt: string | null;
  coverImage: string | null;
  blogPostSlug: string | null;
};

export type EventDetail = EventSummary & {
  blogPostTitle: string | null;
};

export type EventsIndexData = {
  events: EventSummary[];
};
