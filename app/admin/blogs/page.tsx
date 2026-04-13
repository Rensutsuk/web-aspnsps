import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/db'

export const dynamic = 'force-dynamic'

async function togglePublished(formData: FormData) {
  'use server'

  const slug = String(formData.get('slug') ?? '')
  const nextPublished = String(formData.get('published') ?? '') === 'true'

  if (!slug) redirect('/admin/blogs')

  await prisma.blogPost.update({
    where: { slug },
    data: { published: nextPublished },
  })

  revalidatePath('/')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

async function deletePost(formData: FormData) {
  'use server'

  const slug = String(formData.get('slug') ?? '')
  if (!slug) redirect('/admin/blogs')

  await prisma.blogPost.delete({ where: { slug } })

  revalidatePath('/')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export default async function AdminBlogsPage() {
  const posts = await prisma.blogPost.findMany({
    select: {
      slug: true,
      title: true,
      date: true,
      author: true,
      published: true,
      updatedAt: true,
    },
    orderBy: { date: 'desc' },
  })

  return (
    <div className="container mt-12 mx-auto px-4 py-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blog Admin</h1>
          <p className="opacity-70">Create, edit, publish, and delete posts</p>
        </div>
        <Link href="/admin/blogs/new" className="btn btn-primary">
          New Post
        </Link>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Date</th>
              <th>Status</th>
              <th>Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug}>
                <td className="font-medium">{post.title}</td>
                <td className="font-mono text-xs opacity-70">{post.slug}</td>
                <td>{post.date.toISOString().slice(0, 10)}</td>
                <td>{post.published ? 'Published' : 'Draft'}</td>
                <td>{post.updatedAt.toISOString().slice(0, 10)}</td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/blog/${post.slug}`} className="btn btn-ghost btn-sm">
                      View
                    </Link>
                    <Link href={`/admin/blogs/${post.slug}/edit`} className="btn btn-outline btn-sm">
                      Edit
                    </Link>

                    <form action={togglePublished}>
                      <input type="hidden" name="slug" value={post.slug} />
                      <input type="hidden" name="published" value={String(!post.published)} />
                      <button className="btn btn-secondary btn-sm" type="submit">
                        {post.published ? 'Unpublish' : 'Publish'}
                      </button>
                    </form>

                    <form action={deletePost}>
                      <input type="hidden" name="slug" value={post.slug} />
                      <button className="btn btn-error btn-sm" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 opacity-70">
                  No posts yet
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
