import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/db'
import { UTApi } from 'uploadthing/server'
import type { UploadResultState } from '@/app/uploadthing/components'
import { FeaturedImageField, ContentImagesUploader } from '../../ImageFields'
import { requireBlogManager } from '@/auth'

export const dynamic = 'force-dynamic'

async function updatePost(slug: string, formData: FormData) {
  'use server'

  await requireBlogManager()

  const title = String(formData.get('title') ?? '').trim()
  const author = String(formData.get('author') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const featuredImageExisting = String(formData.get('featuredImageExisting') ?? '').trim()
  const featuredImageClear = String(formData.get('featuredImageClear') ?? '') === 'true'
  const dateRaw = String(formData.get('date') ?? '').trim()
  const published = formData.get('published') === 'on'

  if (!slug || !title || !author || !content) redirect(`/admin/blogs/${slug}/edit`)

  const date = dateRaw ? new Date(dateRaw) : new Date()
  let featuredImage: string | null = featuredImageExisting.length > 0 ? featuredImageExisting : null
  if (featuredImageClear) featuredImage = null

  const featuredImageFile = formData.get('featuredImageFile')
  if (featuredImageFile instanceof File && featuredImageFile.size > 0) {
    const utapi = new UTApi()
    const uploaded = await utapi.uploadFiles(featuredImageFile)
    const result = Array.isArray(uploaded) ? uploaded[0] : uploaded
    if ((result as any)?.error) {
      const message = (result as any).error?.message ?? String((result as any).error)
      throw new Error(message)
    }
    const url = (result as any)?.data?.url ?? (result as any)?.data?.ufsUrl ?? (result as any)?.data?.appUrl
    if (url) featuredImage = url
  }

  await prisma.blogPost.update({
    where: { slug },
    data: {
      title,
      author,
      excerpt,
      content,
      featuredImage,
      date,
      published,
    },
  })

  revalidatePath('/')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

async function uploadContentImages(prevState: UploadResultState, formData: FormData): Promise<UploadResultState> {
  'use server'

  await requireBlogManager()

  const utapi = new UTApi()
  const files = formData.getAll('files').filter((f): f is File => f instanceof File && f.size > 0)

  if (files.length === 0) return { urls: [], error: 'No files selected' }

  const uploaded = await utapi.uploadFiles(files)
  const results = Array.isArray(uploaded) ? uploaded : [uploaded]

  const urls: string[] = []
  for (const r of results) {
    if ((r as any)?.error) continue
    const url = (r as any)?.data?.url ?? (r as any)?.data?.ufsUrl ?? (r as any)?.data?.appUrl
    if (url) urls.push(url)
  }

  return { urls, error: urls.length === 0 ? 'Upload failed' : null }
}

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireBlogManager()
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      slug: true,
      title: true,
      author: true,
      excerpt: true,
      content: true,
      featuredImage: true,
      date: true,
      published: true,
    },
  })

  if (!post) notFound()

  const dateValue = post.date.toISOString().slice(0, 10)
  const action = updatePost.bind(null, post.slug)

  return (
    <div className="container mt-12 mx-auto px-4 py-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <p className="opacity-70 font-mono text-sm">{post.slug}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/blogs" className="btn btn-ghost">
            Back
          </Link>
          <Link href={`/blog/${post.slug}`} className="btn btn-outline">
            View
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form action={action} className="lg:col-span-2 space-y-4">
          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input name="title" className="input input-bordered w-full" defaultValue={post.title} required />
              </label>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Author</span>
                  </div>
                  <input name="author" className="input input-bordered w-full" defaultValue={post.author} required />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Date</span>
                  </div>
                  <input name="date" type="date" className="input input-bordered w-full" defaultValue={dateValue} />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Published</span>
                  </div>
                  <input
                    name="published"
                    type="checkbox"
                    className="toggle toggle-primary"
                    defaultChecked={post.published}
                  />
                </label>
              </div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Excerpt</span>
                </div>
                <textarea
                  name="excerpt"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  defaultValue={post.excerpt}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Content (Markdown)</span>
                </div>
                <textarea
                  name="content"
                  className="textarea textarea-bordered w-full font-mono"
                  rows={18}
                  defaultValue={post.content}
                  required
                />
              </label>

              <div className="pt-2">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Featured Image</h2>
              <FeaturedImageField initialUrl={post.featuredImage} />
            </div>
          </div>
        </form>

        <div className="space-y-6">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Upload Images for Markdown</h2>
              <p className="opacity-70">
                Upload images here, then copy a URL into your markdown like: ![](URL)
              </p>
              <ContentImagesUploader action={uploadContentImages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
