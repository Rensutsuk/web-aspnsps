import Hero from './components/home/Hero';
import ImageScroll from './components/home/ImageScroll';
import Events from './components/home/Events';
import Schedule from './components/home/Schedule';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Events />
      <ImageScroll />
      <Schedule />
    </main>
  );
}