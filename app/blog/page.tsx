import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUserEdit, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { prisma } from '@/app/db';

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  featuredImage: string | null;
};

export const dynamic = 'force-dynamic';

async function getBlogPosts(): Promise<BlogPost[]> {
  const raw = await prisma.blogPost.findMany({
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
  });

  return raw.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date.toISOString(),
    author: p.author,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
  }));
}

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default async function BlogListPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="relative min-h-screen w-full bg-base-100 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 mx-auto max-w-[1600px]">
        {/* Page heading */}
        <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[3px] w-10 sm:w-16 bg-primary dark:bg-accent rounded-full" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-primary dark:text-accent font-semibold">
              Updates &amp; Stories
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary dark:text-primary-content leading-tight tracking-wide">
            NEWS &amp; EVENTS
          </h1>
          <p className="mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg text-base-content/85 dark:text-primary-content/85 leading-relaxed">
            Stay up to date with the latest parish announcements, upcoming events,
            inspiring stories, and reflections from our community of Nuestra Señora del
            Perpetuo Socorro.
          </p>
        </section>

        {posts.length === 0 ? (
          <section className="rounded-2xl border border-base-300/70 dark:border-primary/20 bg-base-200/60 dark:bg-neutral/50 px-6 py-16 sm:py-20 text-center shadow-lg dark:shadow-primary/10">
            <div className="text-6xl mb-6 opacity-30">📝</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary dark:text-primary-content mb-3">
              No Blog Posts Yet
            </h2>
            <p className="text-base-content/70 dark:text-primary-content/75 max-w-xl mx-auto text-base sm:text-lg">
              Check back soon for new articles, news announcements, and stories from the
              ASPNSPS community.
            </p>
            <Link
              href="/"
              className="btn btn-outline btn-sm mt-8 text-primary dark:text-primary-content dark:border-primary-content/50 hover:bg-primary hover:text-primary-content dark:hover:bg-accent dark:hover:text-neutral border-primary"
            >
              <FaArrowLeft className="w-3 h-3 mr-2" />
              Back to Home
            </Link>
          </section>
        ) : (
          <>
            {/* FEATURED (latest) article: full width hero card */}
            {featured && (
              <section className="mb-12 md:mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent dark:text-accent font-bold">
                    Latest
                  </span>
                  <div className="flex-1 h-[1px] bg-base-300 dark:bg-primary/20" />
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-base-200 dark:bg-neutral/60 shadow-xl dark:shadow-primary/10 ring-1 ring-base-300/60 dark:ring-primary/15 transition-all duration-300 hover:shadow-2xl hover:ring-primary/50 dark:hover:ring-accent/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-56 sm:h-72 md:h-full w-full overflow-hidden">
                      <Image
                        src={featured.featuredImage || '/img/home/hero.jpg'}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-transparent dark:from-accent/20" />
                    </div>

                    <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70 dark:text-primary-content/75 mb-4">
                        <span className="inline-flex items-center gap-1.5">
                          <FaCalendarAlt className="w-3.5 h-3.5 text-primary dark:text-accent" />
                          {formatDate(featured.date)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-base-content/30 dark:bg-primary-content/30" />
                        <span className="inline-flex items-center gap-1.5">
                          <FaUserEdit className="w-3.5 h-3.5 text-primary dark:text-accent" />
                          {featured.author}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary dark:text-primary-content leading-tight mb-4 group-hover:text-primary-focus dark:group-hover:text-accent transition-colors duration-300">
                        {featured.title}
                      </h2>

                      <p className="text-base sm:text-lg text-base-content/85 dark:text-primary-content/85 leading-relaxed mb-6 flex-1 line-clamp-4 md:line-clamp-5">
                        {featured.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="btn btn-primary text-white group/cta">
                          Read Article
                          <FaArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover/cta:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* MORE ARTICLES grid */}
            {rest.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-content font-bold">
                    More Articles
                  </span>
                  <div className="flex-1 h-[1px] bg-base-300 dark:bg-primary/20" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group card bg-base-200 dark:bg-neutral/60 shadow-lg dark:shadow-primary/10 ring-1 ring-base-300/50 dark:ring-primary/15 overflow-hidden hover:shadow-2xl hover:ring-primary/50 dark:hover:ring-accent/50 transition-all duration-300"
                    >
                      <figure className="relative h-48 sm:h-56 w-full overflow-hidden">
                        <Image
                          src={post.featuredImage || '/img/home/hero.jpg'}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/5 to-transparent dark:from-accent/25" />
                      </figure>

                      <div className="card-body p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-base-content/70 dark:text-primary-content/70 mb-3">
                          <span className="inline-flex items-center gap-1.5">
                            <FaCalendarAlt className="w-3 h-3 text-primary dark:text-accent" />
                            {formatDate(post.date)}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-base-content/30 dark:bg-primary-content/30" />
                          <span className="inline-flex items-center gap-1.5">
                            <FaUserEdit className="w-3 h-3 text-primary dark:text-accent" />
                            {post.author}
                          </span>
                        </div>

                        <h3 className="card-title text-lg sm:text-xl font-bold text-primary dark:text-primary-content leading-snug mb-2 group-hover:text-primary-focus dark:group-hover:text-accent transition-colors duration-300">
                          {post.title}
                        </h3>

                        <p className="text-sm text-base-content/85 dark:text-primary-content/85 leading-relaxed line-clamp-4 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="card-actions justify-end mt-auto">
                          <span className="btn btn-outline btn-sm border-primary text-primary dark:border-primary-content/60 dark:text-primary-content hover:bg-primary hover:text-primary-content dark:hover:bg-accent dark:hover:text-neutral dark:hover:border-accent transition-all duration-200 group/btn">
                            Read More
                            <FaArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover/btn:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back navigation */}
            <section className="mt-14 md:mt-20">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/50 dark:border-primary-content/40 text-primary dark:text-primary-content hover:bg-primary hover:text-primary-content dark:hover:bg-accent dark:hover:text-neutral transition-all duration-200 text-sm font-medium"
              >
                <FaArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Link>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
