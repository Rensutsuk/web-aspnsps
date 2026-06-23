import type { BlogFilterState } from "@/features/blog/types";

const WORDS_PER_MINUTE = 200;

export function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function createExcerpt(markdown: string, fallbackTitle: string, maxLength = 168) {
  const plainText = stripMarkdown(markdown);
  const source = plainText || fallbackTitle;

  if (source.length <= maxLength) {
    return source;
  }

  return `${source.slice(0, maxLength).trimEnd()}...`;
}

export function calculateReadingTime(markdown: string) {
  const wordCount = stripMarkdown(markdown)
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function normalizeFilterState(input: {
  query?: string | string[] | undefined;
}): BlogFilterState {
  const readValue = (value?: string | string[]) => {
    if (Array.isArray(value)) {
      return value[0] ?? "";
    }

    return value ?? "";
  };

  return {
    query: readValue(input.query).trim(),
  };
}

export function buildBlogQueryString(filters: Partial<BlogFilterState>) {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set("q", filters.query);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}
