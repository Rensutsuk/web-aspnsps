import Hero from './components/home/Hero';
import ScheduleOfMasses from './components/home/ScheduleOfMasses';
import ContactUs from './components/home/ContactUs';

export default function Home() {
  return (
    <main className="h-dvh overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <section className="snap-start [scroll-snap-stop:always]">
        <Hero />
      </section>
      <section className="snap-start [scroll-snap-stop:always]">
        <ScheduleOfMasses />
      </section>
      <section className="snap-start [scroll-snap-stop:always]">
        <ContactUs />
      </section>
    </main>
  );
}
