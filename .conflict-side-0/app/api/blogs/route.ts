import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    // Get the blogs directory path
    const blogsDirectory = path.join(process.cwd(), 'public/blogs');
    
    // Read all files in the blogs directory
    const filenames = await fs.readdir(blogsDirectory);
    
    // Filter only markdown files
    const markdownFiles = filenames.filter(file => file.endsWith('.md'));
    
    // Read and parse each markdown file
    const blogs = await Promise.all(
      markdownFiles.map(async (filename) => {
        const filePath = path.join(blogsDirectory, filename);
        const fileContent = await fs.readFile(filePath, 'utf8');
        
        // Parse the frontmatter using gray-matter
        const { data } = matter(fileContent);
        
        // Return the blog post data with the slug (filename without extension)
        return {
          slug: filename.replace(/\.md$/, ''),
          title: data.title,
          date: data.date,
          author: data.author,
          excerpt: data.excerpt,
          featuredImage: data.featuredImage
        };
      })
    );
    
    // Sort blogs by date (newest first)
    const sortedBlogs = blogs.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    // Return the blogs as JSON
    return new Response(JSON.stringify(sortedBlogs), {
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