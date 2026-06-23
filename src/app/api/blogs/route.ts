import { getBlogIndexData } from "@/features/blog/data";
import { normalizeFilterState } from "@/features/blog/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = normalizeFilterState({
    query: searchParams.get("q") ?? undefined,
  });

  const data = await getBlogIndexData(filters);

  return Response.json(data.posts);
}
