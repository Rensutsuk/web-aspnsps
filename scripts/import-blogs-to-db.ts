import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { UTApi } from 'uploadthing/server'
import { prisma } from '../app/db'

type Frontmatter = {
  title?: string
  date?: string
  author?: string
  excerpt?: string
  featuredImage?: string
  published?: boolean
}

function getContentTypeFromFilename(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.gif') return 'image/gif'
  if (ext === '.svg') return 'image/svg+xml'
  return 'application/octet-stream'
}

function resolvePublicFileFromUrlPath(urlPath: string) {
  const normalized = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath
  return path.join(process.cwd(), 'public', normalized)
}

function extractMarkdownImageUrls(markdown: string) {
  const urls = new Set<string>()
  const imageMd = /!\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g
  for (const match of markdown.matchAll(imageMd)) {
    if (!match[1]) continue
    urls.add(match[1])
  }
  return [...urls]
}

function replaceAll(markdown: string, replacements: Map<string, string>) {
  let out = markdown
  for (const [from, to] of replacements.entries()) {
    out = out.split(from).join(to)
  }
  return out
}

async function uploadPublicFileIfExists(utapi: UTApi, urlPath: string) {
  if (!urlPath) return null
  if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) return urlPath

  const filePath = resolvePublicFileFromUrlPath(urlPath)
  try {
    await fs.access(filePath)
  } catch {
    return null
  }

  const buffer = await fs.readFile(filePath)
  const filename = path.basename(filePath)
  const file = new File([buffer], filename, { type: getContentTypeFromFilename(filename) })
  const uploaded = await utapi.uploadFiles(file)
  const result = Array.isArray(uploaded) ? uploaded[0] : uploaded
  if (!result) throw new Error(`Uploadthing returned no result for ${urlPath}`)
  if ((result as any).error) {
    const message = (result as any).error?.message ?? String((result as any).error)
    throw new Error(`Uploadthing error uploading ${urlPath}: ${message}`)
  }
  const url = (result as any).data?.url ?? (result as any).data?.ufsUrl ?? (result as any).data?.appUrl
  if (!url) throw new Error(`Uploadthing returned no url for ${urlPath}`)
  return url as string
}

async function main() {
  if (!process.env.UPLOADTHING_SECRET || !process.env.UPLOADTHING_APP_ID) {
    throw new Error('Missing UPLOADTHING_SECRET or UPLOADTHING_APP_ID in environment')
  }

  const utapi = new UTApi()
  const blogsDir = path.join(process.cwd(), 'public', 'blogs')
  const filenames = await fs.readdir(blogsDir)
  const markdownFiles = filenames.filter((f) => f.endsWith('.md'))

  const uploadedByPath = new Map<string, string>()

  for (const filename of markdownFiles) {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(blogsDir, filename)
    const raw = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(raw)
    const fm = data as Frontmatter

    const title = fm.title ?? slug
    const date = fm.date ? new Date(fm.date) : new Date()
    const author = fm.author ?? 'Unknown'
    const excerpt = fm.excerpt ?? ''
    const published = fm.published ?? true

    let featuredImage = fm.featuredImage ?? null
    if (featuredImage && !uploadedByPath.has(featuredImage)) {
      const uploadedUrl = await uploadPublicFileIfExists(utapi, featuredImage)
      if (uploadedUrl) uploadedByPath.set(featuredImage, uploadedUrl)
    }
    if (featuredImage && uploadedByPath.has(featuredImage)) {
      featuredImage = uploadedByPath.get(featuredImage) ?? featuredImage
    }

    const imageUrlsInContent = extractMarkdownImageUrls(content)
    const replacements = new Map<string, string>()

    for (const imgUrl of imageUrlsInContent) {
      if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) continue
      if (!imgUrl.startsWith('/')) continue

      if (!uploadedByPath.has(imgUrl)) {
        const uploadedUrl = await uploadPublicFileIfExists(utapi, imgUrl)
        if (uploadedUrl) uploadedByPath.set(imgUrl, uploadedUrl)
      }
      const finalUrl = uploadedByPath.get(imgUrl)
      if (finalUrl) replacements.set(imgUrl, finalUrl)
    }

    const updatedContent = replaceAll(content, replacements)

    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title,
        date,
        author,
        excerpt,
        featuredImage,
        content: updatedContent,
        published,
      },
      create: {
        slug,
        title,
        date,
        author,
        excerpt,
        featuredImage,
        content: updatedContent,
        published,
      },
    })
  }

  await prisma.$disconnect()
}

main().catch(async (err) => {
  console.error(err)
  await prisma.$disconnect()
  process.exit(1)
})
