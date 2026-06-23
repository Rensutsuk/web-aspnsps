import { getBlogPostBySlug } from "@/features/blog/data";

export async function GET(_request: Request, context: RouteContext<"/api/blogs/[slug]">) {
  const { slug } = await context.params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return Response.json({ error: "Blog post not found" }, { status: 404 });
  }

  return Response.json(post);
}
