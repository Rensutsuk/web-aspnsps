import { redirect } from 'next/navigation'

export default async function AdminBlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/admin/blogs/${slug}/edit`)
}
