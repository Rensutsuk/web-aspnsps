import Hero from './components/home/Hero';
import ImageScroll from './components/home/ImageScroll';
import BlogList from './components/home/BlogList';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="h-dvh overflow-y-auto snap-y snap-mandatory scroll-smooth [scroll-padding-top:64px]">
      <section className="snap-start [scroll-snap-stop:always] [scroll-margin-top:64px]">
        <Hero />
      </section>
      <section className="snap-start [scroll-snap-stop:always] [scroll-margin-top:64px]">
        <BlogList />
      </section>
      <section className="snap-start [scroll-snap-stop:always]">
        <ImageScroll />
      </section>
    </main>
  );
}