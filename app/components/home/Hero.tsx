'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { FaChevronLeft, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const HERO_IMAGES = [
  '/img/home/home-3.jpg',
  '/img/home/home-4.jpg',
  '/img/home/home-5.jpg',
  '/img/home/home-6.jpg',
  '/img/home/home-1.jpg',
  '/img/home/home-2.jpg',
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 200 }, [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div ref={emblaRef} className="absolute inset-0">
        <div className="flex h-full">
          {HERO_IMAGES.map((src, i) => (
            <div
              key={src}
              className="relative min-w-full h-full [&>*]:opacity-100"
            >
              <Image
                src={src}
                alt={`Shrine photo ${i + 1}`}
                fill
                sizes="100vw"
                className="w-full h-full object-cover object-center"
                priority={i === 0}
                quality={90}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 85%, rgba(0,0,0,0.65) 100%), linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        <p className="font-[family-name:var(--font-cinzel)] text-sm sm:text-base md:text-lg lg:text-2xl tracking-[0.2em] font-semibold uppercase mb-2 md:mb-4 text-white/95 drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]">
          Archdiocesan Shrine and Parish of Nuestra Señora del
        </p>
        <h1 className="font-[family-name:var(--font-cinzel-decorative)] font-black tracking-wider leading-[0.92] sm:text-4xl md:text-6xl lg:text-8xl text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.75)]">
          PERPETUO SOCORRO
        </h1>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="z-20 absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary-content hover:text-accent hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        <FaChevronLeft className="w-full h-full" strokeWidth={1.5} />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        className="z-20 absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary-content hover:text-accent hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        <FaChevronRight className="w-full h-full" strokeWidth={1.5} />
      </button>

      <div className="z-20 absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              selectedIndex === i
                ? 'w-4 h-4 sm:w-5 sm:h-5 bg-primary-content scale-110'
                : 'w-3 h-3 sm:w-3.5 sm:h-3.5 bg-accent hover:bg-accent/80 hover:scale-105'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          const nextSection = document.querySelector('section + section') as HTMLElement | null;
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }}
        aria-label="Scroll down"
        className="z-20 absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 text-primary-content/90 hover:text-accent hover:-translate-y-1 transition-all duration-300 animate-bounce"
      >
        <FaChevronDown className="w-full h-full" />
      </button>
    </section>
  );
}
