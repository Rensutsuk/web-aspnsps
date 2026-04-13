import { prisma } from '@/app/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      select: {
        slug: true,
        title: true,
        date: true,
        author: true,
        excerpt: true,
        featuredImage: true,
      },
      orderBy: { date: 'desc' },
    })

    return new Response(JSON.stringify(blogs), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blog posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
