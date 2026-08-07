import { cache } from "react";

import { prisma, withConnectionGuard } from "@/lib/prisma";
import type { BlogFilterState, BlogIndexData, BlogPostDetail, BlogPostSummary } from "@/features/blog/types";
import { calculateReadingTime, createExcerpt } from "@/features/blog/utils";

type PublishedPostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  date: Date;
  author: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function mapPost(record: PublishedPostRecord): BlogPostSummary {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt?.trim() || createExcerpt(record.content, record.title),
    content: record.content,
    featuredImage: record.featuredImage,
    date: record.date.toISOString(),
    readingTimeMinutes: calculateReadingTime(record.content),
    author: record.author,
  };
}

async function safeQuery<T>(operation: () => Promise<T>, fallback: T, label = "Blog") {
  return withConnectionGuard(
    operation,
    () => fallback,
    (error) => {
      console.error(`${label} query failed`, error);
      return fallback;
    },
  )();
}

const getPublishedPostRecords = cache(async () => {
  const records = await safeQuery(
    () =>
      prisma.blogPost.findMany({
        where: { published: true },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          content: true,
          featuredImage: true,
          date: true,
          author: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          date: "desc",
        },
      }) as Promise<PublishedPostRecord[]>,
    [] as PublishedPostRecord[],
    "Blog listing",
  );

  return records.map(mapPost);
});

function matchesFilters(post: BlogPostSummary, filters: BlogFilterState) {
  const query = filters.query.trim().toLowerCase();
  return (
    !query ||
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query) ||
    post.author.toLowerCase().includes(query) ||
    post.content.toLowerCase().includes(query)
  );
}

export async function getBlogIndexData(filters: BlogFilterState): Promise<BlogIndexData> {
  const posts = await getPublishedPostRecords();
  const filteredPosts = posts.filter((post) => matchesFilters(post, filters));

  return {
    filters,
    posts: filteredPosts,
    totalPosts: posts.length,
  };
}

export async function getLatestPublishedPosts(limit = 3) {
  const posts = await getPublishedPostRecords();
  return posts.slice(0, limit);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const record = await safeQuery(
    () =>
      prisma.blogPost.findUnique({
        where: { slug },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          content: true,
          featuredImage: true,
          date: true,
          author: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
      }) as Promise<PublishedPostRecord | null>,
    null,
    `Blog detail [${slug}]`,
  );

  if (!record || !record.published) {
    return null;
  }

  const post = mapPost(record);
  const posts = await getPublishedPostRecords();
  const relatedPosts = posts
    .filter((candidate) => candidate.slug !== slug)
    .sort((left, right) => Number(right.author === post.author) - Number(left.author === post.author))
    .slice(0, 3);

  return {
    ...post,
    relatedPosts,
  };
}
