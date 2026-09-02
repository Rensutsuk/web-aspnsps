import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { remark } from "remark";
import html from "remark-html";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import { prisma } from "@/app/db";

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
    });

    if (!post || !post.published) return null;

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(post.content);

    return {
      slug: post.slug,
      title: post.title,
      date: post.date.toISOString(),
      author: post.author,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      content: processedContent.toString(),
    };
  },
  ["blog-post"],
  { revalidate: 3600 },
);

// Format the date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Blog post page component
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen w-full bg-base-100 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
      
      <article className="relative z-10 container mx-auto px-4 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-6 md:mb-8 rounded-full px-4 py-2 text-sm font-medium border border-primary-content/40 text-primary-content hover:bg-primary hover:text-primary-content dark:border-primary-content/40 dark:text-primary-content dark:hover:bg-accent dark:hover:text-neutral transition-all duration-200"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          Back to Blog
        </Link>

        <div className="rounded-3xl bg-base-200/80 dark:bg-neutral/70 ring-1 ring-base-300/60 dark:ring-primary/15 shadow-xl dark:shadow-primary/10 p-6 sm:p-10 md:p-14">
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary dark:text-primary-content leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/75 dark:text-primary-content/80">
              <span className="inline-flex items-center gap-1.5">
                <FaCalendarAlt className="w-3.5 h-3.5 text-primary dark:text-accent" />
                {formatDate(post.date)}
              </span>
              <span className="w-1 h-1 rounded-full bg-base-content/30 dark:bg-primary-content/30" />
              <span className="inline-flex items-center gap-1.5">
                <FaUserEdit className="w-3.5 h-3.5 text-primary dark:text-accent" />
                By {post.author}
              </span>
            </div>
          </div>

          {post.featuredImage && (
            <div className="w-full overflow-hidden rounded-2xl mt-8 md:mt-10 ring-1 ring-base-300/60 dark:ring-primary/20 shadow-lg dark:shadow-primary/10">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}
        </div>

        <div
          className="
              prose prose-lg max-w-none
              prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
              prose-p:mb-6
              prose-a:text-primary hover:prose-a:text-primary-focus dark:prose-a:text-accent dark:hover:prose-a:text-accent/85
              prose-blockquote:border-l-4 prose-blockquote:border-primary dark:prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic
              prose-strong:text-base-content dark:prose-strong:text-primary-content
              prose-code:text-primary dark:prose-code:text-accent prose-code:bg-base-200 dark:prose-code:bg-neutral prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-base-200 dark:prose-pre:bg-neutral prose-pre:text-base-content dark:prose-pre:text-primary-content
              prose-img:rounded-lg prose-img:shadow-lg
              prose-li:text-base-content dark:prose-li:text-primary-content prose-li:my-2 prose-ul:pl-6 prose-ul:my-6 prose-ol:pl-6 prose-ol:my-6
              prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-primary dark:prose-li:marker:text-accent prose-li:marker:font-bold prose-li:before:hidden
              space-y-6

              text-base-content dark:text-primary-content
              "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
