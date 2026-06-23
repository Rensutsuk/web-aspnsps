import { redirect } from "next/navigation";

type AdminBlogSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AdminBlogSlugPage({ params }: AdminBlogSlugPageProps) {
  const { slug } = await params;
  redirect(`/admin/blogs/${slug}/edit`);
}
