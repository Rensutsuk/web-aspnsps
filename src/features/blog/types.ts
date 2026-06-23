export type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  date: string;
  readingTimeMinutes: number;
  author: string;
};

export type BlogPostDetail = BlogPostSummary & {
  relatedPosts: BlogPostSummary[];
};

export type BlogFilterState = {
  query: string;
};

export type BlogIndexData = {
  filters: BlogFilterState;
  posts: BlogPostSummary[];
  totalPosts: number;
};
