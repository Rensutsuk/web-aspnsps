"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ScheduleOfMasses() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 300 }, [
    Fade(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSlidesCount(emblaApi.scrollSnapList().length);
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleScrollNext = () => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section"),
    );
    let idx = -1;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top >= -10 && rect.top <= window.innerHeight * 0.5) {
        idx = i;
        break;
      }
    }
    if (idx === -1) return;
    const next = sections[idx + 1] ?? sections[0];
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full bg-base-content/95 dark:bg-neutral flex items-start justify-center">
      <div className="absolute inset-x-0 top-0 h-15 md:h-20 lg:h-20 overflow-hidden pointer-events-none">
        <Image
          src="/img/home/home-3.jpg"
          alt="Shrine banner"
          fill
          sizes="100vw"
          className="w-full h-full object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full h-[calc(100vh-8vh)] bg-base-100 mt-15 md:mt-20 lg:mt-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center select-none z-0">
          <Image
            src="/img/home/home-bg.png"
            alt="Schedule of Masses background"
            fill
            priority={false}
            className="w-full h-80vh object-cover md:object-contain dark:brightness-125 dark:contrast-125"
          />
        </div>

        {/* ========== MD / LG / XL (≥768px) — STATIC 3-COL LAYOUT ========== */}
        <div className="relative z-10 h-full w-full md:px-12 lg:px-20 xl:px-28 md:py-8 lg:py-10 flex-col gap-0 hidden md:flex">
          <h1 className="text-accent text-center font-[family-name:var(--font-cinzel-decorative)] md:text-xl lg:text-3xl xl:text-5xl font-black leading-tight md:tracking-[0.1em] uppercase md:mb-4 drop-shadow-md self-center md:mb-0 lg:mb-4 xl:mb-20">
            SCHEDULE OF MASSES, PRAYERS AND NOVENAS
          </h1>

          <div className="relative w-full grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-0 items-start text-primary-content">
            <div className="space-y-2 text-center md:pt-3 lg:pt-6 md:px-2 lg:px-4">
              <div>
                <h3 className="md:text-xl lg:text-2xl xl:text-3xl font-black uppercase mb-2 lg:mb-4">
                  MONDAYS TO SATURDAYS
                </h3>
                <div className="flex md:flex-row md:justify-center md:gap-12 lg:gap-20 md:text-lg lg:text-xl xl:text-2xl font-medium text-base-content">
                  <span>6:00 AM</span>
                  <span>06:00 PM</span>
                </div>
              </div>
              <div className="md:mt-6 lg:mt-10">
                <h3 className="md:text-xl lg:text-2xl xl:text-3xl font-black uppercase mb-2 lg:mb-4">
                  WEDNESDAYS
                </h3>
                <div className="flex md:flex-row md:justify-center md:gap-6 lg:gap-10 md:text-lg lg:text-xl xl:text-2xl font-medium text-base-content">
                  <span>6:30 AM</span>
                  <span>12:15 PM</span>
                  <span>06:00 PM</span>
                </div>
              </div>
            </div>

            <div className="self-stretch border-l-[5px] lg:border-l-[6px] border-primary mx-auto h-full md:h-[92%] lg:h-[100%]" />

            <div className="text-center md:space-y-1 md:pt-10 lg:pt-16 md:px-2 lg:px-4">
              <h3 className="md:text-xl lg:text-2xl xl:text-3xl font-black uppercase mb-2 lg:mb-4">
                SUNDAYS
              </h3>
              <div className="grid grid-cols-2 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 md:gap-y-2 lg:gap-y-3 md:text-lg lg:text-xl xl:text-2xl font-medium text-base-content max-w-md mx-auto">
                <span>6:00 AM</span>
                <span>12:15 PM</span>
                <span>7:00 AM</span>
                <span>4:00 PM</span>
                <span>8:30 AM</span>
                <span>5:30 PM</span>
                <span>10:00 AM</span>
                <span>7:00 PM</span>
              </div>
            </div>

            <div className="self-stretch border-l-[5px] lg:border-l-[6px] border-primary mx-auto h-full md:h-[92%] lg:h-[100%]" />

            <div className="text-center md:space-y-3 lg:space-y-4 md:pt-3 lg:pt-6 md:px-2 lg:px-4">
              <div>
                <h3 className="md:text-xl lg:text-2xl xl:text-3xl font-black uppercase mb-1">
                  LAUDS &amp; VESPERS
                </h3>
                <p className="md:text-base lg:text-xl uppercase tracking-wide text-base-content mb-1">
                  (MORNING AND EVENING PRAYER)
                </p>
                <p className="md:text-lg lg:text-2xl font-medium text-base-content">
                  Everyday before 6AM &amp; 6PM Holy Mass
                </p>
              </div>
              <div>
                <h3 className="md:text-xl lg:text-2xl xl:text-3xl font-black uppercase mb-1">
                  DAILY ROSARY
                </h3>
                <p className="md:text-lg lg:text-xl font-medium text-base-content">  
                  Before Every Holy Mass during weekdays
                </p>
              </div>
              <div>
                <h3 className="md:text-xl lg:text-2xl xl:text-3xl font-black uppercase mb-1 leading-tight"> 
                  EXPOSITION &amp; BENEDICTION OF THE BLESSED SACRAMENT
                </h3>
                <p className="md:text-lg lg:text-xl font-medium text-base-content">  
                  Wednesdays &amp; First Fridays | 5:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 md:gap-10 lg:gap-16 text-primary-content pb-4 lg:pb-6">
            <div className="md:pt-4 lg:pt-10">
              <div className="text-center md:pl-2 lg:pl-10">
                <h3 className="md:text-xl lg:text-2xl xl:text-3xl font-black uppercase mb-2">
                  NOVENA TO OMPH
                </h3>
                <p className="md:text-lg lg:text-xl font-medium text-base-content">
                  WEDNESDAYS |
                  6:00AM, 11:30AM &amp; 5:00PM
                </p>
              </div>
            </div>

            <div className="md:pt-4 lg:pt-10">
              <div className="flex flex-col md:items-start">
                <h3 className="md:text-xl lg:text-2xl xl:text-3xl font-black uppercase mb-2 lg:mb-3 text-primary-content">
                  FIRST SATURDAY
                </h3>
                <div className="md:space-y-1 lg:space-y-2 md:text-lg lg:text-xl font-medium text-base-content max-w-md w-full">
                  <div className="grid grid-cols-[auto_1fr] md:gap-x-4 lg:gap-x-6 text-left items-baseline justify-start">
                    <span className="font-bold text-primary-content whitespace-nowrap md:text-lg lg:text-xl">
                      5:00 AM
                    </span>
                    <span className="md:text-lg lg:text-xl">
                      Dawn Procession
                    </span>
                    <span className="font-bold text-primary-content whitespace-nowrap md:text-lg lg:text-xl">
                      6:00 AM
                    </span>
                    <span className="md:text-lg lg:text-xl">
                      Holy Mass
                    </span>
                    <span className="font-bold text-primary-content whitespace-nowrap md:text-lg lg:text-xl">
                      11:00 AM
                    </span>
                    <span className="md:text-lg lg:text-xl">
                      Healing Mass
                    </span>
                    <span className="font-bold text-primary-content whitespace-nowrap md:text-lg lg:text-xl">
                      6:00 PM
                    </span>
                    <span className="md:text-lg lg:text-xl">
                      Anticipated Mass
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SM / XS (<768px) — CAROUSEL SLIDES ========== */}
        <div className="z-10 h-[calc(100vh-15vh)] w-full px-4 sm:px-6 py-4 sm:py-6 flex flex-col justify-center items-center md:hidden">
          <h1 className="text-accent text-center font-[family-name:var(--font-cinzel-decorative)] text-xl sm:text-2xl font-black leading-none tracking-wide uppercase mb-2 sm:mb-3 drop-shadow-sm self-center">
            SCHEDULE OF MASSES, PRAYERS AND NOVENAS
          </h1>

          <div className="relative w-full overflow-hidden">
            <div ref={emblaRef} className="w-full h-full">
              <div className="flex w-full h-full">
                {/* Slide 1 — Weekday Masses */}
                <div className="min-w-0 flex-[0_0_100%] h-full px-1 sm:px-2 flex flex-col justify-center items-center text-primary-content space-y-6 sm:space-y-8">
                  <div className="text-center space-y-1 w-full">
                    <h3 className="text-lg sm:text-xl font-black tracking-[0.2em] uppercase mb-2">
                      MONDAYS TO SATURDAYS
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-16 text-base sm:text-lg font-medium text-base-content">
                      <span>6:00 AM</span>
                      <span>06:00 PM</span>
                    </div>
                  </div>
                  <div className="text-center space-y-1 w-full">
                    <h3 className="text-lg sm:text-xl font-black tracking-[0.2em] uppercase mb-2">  
                      WEDNESDAYS
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8 text-base sm:text-lg font-medium text-base-content">
                      <span>6:30 AM</span>
                      <span>12:15 PM</span>
                      <span>06:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Slide 2 — Sunday Masses */}
                <div className="min-w-0 flex-[0_0_100%] h-full px-1 sm:px-2 flex flex-col justify-center items-center text-primary-content">
                  <div className="text-center w-full space-y-3">
                    <h3 className="font-mono text-lg sm:text-xl font-black tracking-[0.2em] uppercase mb-2">
                      SUNDAYS
                    </h3>
                    <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-2 text-base sm:text-lg font-medium text-base-content max-w-sm mx-auto">
                      <span>6:00 AM</span>
                      <span>12:15 PM</span>
                      <span>7:00 AM</span>
                      <span>4:00 PM</span>
                      <span>8:30 AM</span>
                      <span>5:30 PM</span>
                      <span>10:00 AM</span>
                      <span>7:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Slide 3 — Prayers */}
                <div className="min-w-0 flex-[0_0_100%] h-full px-1 sm:px-2 flex flex-col justify-center items-center text-primary-content space-y-4 sm:space-y-5">
                  <div className="text-center w-full">
                    <h3 className="text-lg sm:text-xl font-black tracking-[0.2em] uppercase mb-1">
                      LAUDS &amp; VESPERS
                    </h3>
                    <p className="text-xs sm:text-sm uppercase tracking-wide text-base-content mb-1">
                      (MORNING AND EVENING PRAYER)
                    </p>
                    <p className="text-sm sm:text-base font-medium text-base-content">
                      Everyday before 6AM &amp; 6PM Holy Mass
                    </p>
                  </div>
                  <div className="text-center w-full">
                    <h3 className="text-lg sm:text-xl font-black tracking-[0.2em] uppercase mb-1">
                      DAILY ROSARY
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-base-content">
                      Before Every Holy Mass during weekdays
                    </p>
                  </div>
                  <div className="text-center w-full">
                    <h3 className="text-base sm:text-lg font-black tracking-[0.15em] uppercase mb-1 leading-tight">
                      EXPOSITION &amp; BENEDICTION OF THE BLESSED SACRAMENT
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-base-content">
                      Wednesdays &amp; First Fridays | 5:00 PM
                    </p>
                  </div>
                </div>

                {/* Slide 4 — Novena + First Saturday */}
                <div className="min-w-0 flex-[0_0_100%] h-full px-1 sm:px-2 flex flex-col justify-center items-center text-primary-content space-y-5 sm:space-y-6">
                  <div className="text-center w-full">
                    <h3 className="text-lg sm:text-xl font-black tracking-[0.2em] uppercase mb-1">
                      NOVENA TO OMPH
                    </h3>
                    <p className="text-base sm:text-xl font-semibold text-base-content mb-1">
                      WEDNESDAYS |
                    </p>
                    <p className="text-base sm:text-xl font-medium text-base-content tracking-wide">
                      6:00AM, 11:30AM &amp; 5:00PM
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h3 className="text-lg sm:text-xl font-black tracking-[0.2em] uppercase mb-2 text-primary-content">
                      FIRST SATURDAY
                    </h3>
                    <div className="space-y-1 text-base sm:text-lg font-medium text-base-content max-w-sm w-full">
                      <div className="grid grid-cols-[auto_1fr] gap-x-4 text-left items-baseline justify-start">
                        <span className="font-bold text-primary-content whitespace-nowrap text-sm sm:text-base">
                          5:00 AM
                        </span>
                        <span className="text-sm sm:text-lg">
                          Dawn Procession
                        </span>
                        <span className="font-bold text-primary-content whitespace-nowrap text-sm sm:text-base">
                          6:00 AM
                        </span>
                        <span className="text-sm sm:text-lg">Holy Mass</span>
                        <span className="font-bold text-primary-content whitespace-nowrap text-sm sm:text-base">
                          11:00 AM
                        </span>
                        <span className="text-sm sm:text-lg">Healing Mass</span>
                        <span className="font-bold text-primary-content whitespace-nowrap text-sm sm:text-base">
                          6:00 PM
                        </span>
                        <span className="text-sm sm:text-lg">
                          Anticipated Mass
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous slide"
              className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-primary-content hover:text-accent transition-colors bg-base-100/60 backdrop-blur-sm"
            >
              <FaChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next slide"
              className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-primary-content hover:text-accent transition-colors bg-base-100/60 backdrop-blur-sm"
            >
              <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-2 sm:mt-3 z-20">
            {Array.from({ length: slidesCount }).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "bg-primary-content w-6 sm:w-8"
                    : "bg-accent/80 w-2 sm:w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleScrollNext}
          aria-label="Scroll down"
          className="z-20 absolute bottom-2 sm:bottom-3 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-primary-content hover:text-accent hover:-translate-y-1 transition-all duration-300 animate-bounce"
        >
          <FaChevronDown className="w-full h-full" />
        </button>
      </div>
    </section>
  );
}
