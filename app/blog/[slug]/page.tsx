import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache'
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/app/db'

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  featuredImage: string | null;
  content: string;
};

const getBlogPost = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        slug: true,
        title: true,
        date: true,
        author: true,
        excerpt: true,
        featuredImage: true,
        content: true,
        published: true,
      },
    })

    if (!post || !post.published) return null

    const processedContent = await remark().use(html, { sanitize: false }).process(post.content)

    return {
      slug: post.slug,
      title: post.title,
      date: post.date.toISOString(),
      author: post.author,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      content: processedContent.toString(),
    }
  },
  ['blog-post'],
  { revalidate: 3600 },
)

// Format the date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Blog post page component
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mt-8 py-16 bg-base-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-6">
            <p>{formatDate(post.date)}</p>
            <p>By {post.author}</p>
          </div>

          {post.featuredImage && (
            <div className="w-full overflow-hidden rounded-lg mb-8">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={800}
                height={450}
                sizes="(max-width: 768px) 100vw, 800px"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>

        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:text-gray-600 prose-p:mb-6 prose-a:text-primary hover:prose-a:text-primary-focus prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-strong:text-gray-900 prose-code:text-primary prose-code:bg-base-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-base-200 prose-pre:text-base-content prose-img:rounded-lg prose-img:shadow-lg prose-li:text-gray-600 prose-li:my-2 prose-ul:pl-6 prose-ul:my-6 prose-ol:pl-6 prose-ol:my-6 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-primary prose-li:marker:font-bold prose-li:before:hidden space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12">
          <Link href="/" className="btn btn-outline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
