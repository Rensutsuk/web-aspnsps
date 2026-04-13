'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  featuredImage: string | null;
};

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Parish Blog</h2>
        {loading ? (
          <div className="text-center py-16">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="mt-4">Loading blog posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <>
            <motion.div 
              key={currentPage}
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {currentPosts.map((post) => (  // Removed unused index parameter
                <motion.div
                  key={`${currentPage}-${post.slug}`}
                  variants={item}
                  className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <figure className="h-48 overflow-hidden">
                    <Image 
                      src={post.featuredImage || '/img/home/hero.jpg'} 
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-lg">{post.title}</h3>
                    <div className="text-sm opacity-70">
                      <p>{formatDate(post.date)}</p>
                      <p>By {post.author}</p>
                    </div>
                    <p className="mt-2 text-sm">{post.excerpt}</p>
                    <div className="card-actions justify-end mt-4">
                      <Link href={`/blog/${post.slug}`} className="btn btn-outline btn-sm">Read More</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-circle btn-sm"
                >
                  <FaChevronLeft />
                </button>
                
                <div className="join">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`btn btn-sm join-item ${
                        currentPage === index + 1 ? 'btn-primary' : ''
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-circle btn-sm"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-30">📝</div>
            <h3 className="text-2xl font-bold mb-2">No Blog Posts Yet</h3>
            <p className="text-base-content/70">
              Check back soon for new articles and parish updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
