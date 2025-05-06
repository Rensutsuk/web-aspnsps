import Hero from './components/home/Hero';
import ImageScroll from './components/home/ImageScroll';
import BlogList from './components/home/BlogList';
import Schedule from './components/home/Schedule';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <BlogList />
      <ImageScroll />
      <Schedule />
    </main>
  );
}