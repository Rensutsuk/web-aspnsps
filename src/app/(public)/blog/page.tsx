import type { Metadata } from "next";

import { BlogIndexPage } from "@/components/blog/BlogIndexPage";
import { getBlogIndexData } from "@/features/blog/data";
import { normalizeFilterState } from "@/features/blog/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Browse parish announcements, reflections, and ministry updates.",
  alternates: {
    canonical: "/blog",
  },
};

type BlogRouteProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function BlogRoute({ searchParams }: BlogRouteProps) {
  const params = await searchParams;
  const filters = normalizeFilterState({ query: params.q });
  const data = await getBlogIndexData(filters);

  return <BlogIndexPage data={data} />;
}
