'use client';

import Image from "next/image";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { useRef, useState, useEffect } from "react";

type Slide = {
  label: string;
  title: string;
  subtitle?: string;
  image: string;
  paragraphs: string[];
};

const SLIDES: Slide[] = [
  {
    label: "Overview",
    title: "Parish History",
    subtitle: "Our Journey Through Time Since 1951",
    image: "https://picsum.photos/1400/900?random=1",
    paragraphs: [
      "Explore the major moments that shaped the parish, from its humble beginnings to its continuing mission today.",
      "Each chapter highlights the people, milestones, and developments that built the community through the years."
    ]
  },
  {
    label: "1951",
    title: "1951: The Foundation",
    image: "https://picsum.photos/1400/900?random=2",
    paragraphs: [
      "From being a part of the Parish of Espiritu Santo, the newborn parish was erected on August 28, 1951, by His Eminence Manila Archbishop Gabriel Reyes. Fr. Candido Bernal was installed as the first parish priest by Msgr. Narciso Gatpaydan.",
      "The present site, formerly a 13-hectare lot called 'Lumang Tinapay', was a swampy area where grass and kangkong thrived. The parish began with a small wooden chapel, funded by an initial P5000 from Archbishop Gabriel Reyes."
    ]
  },
  {
    label: "1966–1969",
    title: "1966–1969: Growth and Development",
    image: "https://picsum.photos/1400/900?random=3",
    paragraphs: [
      "The cornerstone laying of the permanent church was officiated by the first Filipino prince of the church, Archbishop Rufino Cardinal Santos on November 20, 1966.",
      "During the construction, Fr. Bernal established the community structure and strengthened formation programs. His dedication led to his appointment as Privy Chamberlain on June 29, 1969."
    ]
  },
  {
    label: "1970–1976",
    title: "1970–1976: Expansion and Celebration",
    image: "https://picsum.photos/1400/900?random=4",
    paragraphs: [
      "In 1970, the parochial boundaries were redefined between NSPS of Manila and Sta. Teresita Parish in Quezon City. The parish celebrated its Silver Jubilee on October 4, 1976, with Cardinal Jaime Sin officiating the thanksgiving mass."
    ]
  },
  {
    label: "1984–1989",
    title: "1984–1989: Further Development",
    image: "https://picsum.photos/1400/900?random=5",
    paragraphs: [
      "Construction of the multi-purpose center began in 1984 and was completed in 1988. In 1989, Fr. Bernal retired after 38 years of service. Fr. Honorato Nadua became the second parish priest, initiating the construction of the rectory and Adoration Chapel."
    ]
  },
  {
    label: "2001–Present",
    title: "2001–Present: Modern Era",
    image: "https://picsum.photos/1400/900?random=6",
    paragraphs: [
      "The parish celebrated its Golden Jubilee on October 6, 2001, with Bishop Teodoro Buhain presiding. In 2005, the Nuestra Senora Del Perpetuo Socorro Foundation was established to provide scholarships and conduct community development programs.",
      "Since 2006, Fr. Jerome Secillano, the 4th pastor, has been leading the parish's continued growth and development."
    ]
  }
];

export default function HistoryPage() {
  const slideButtons = SLIDES.map((slide) => slide.label);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const active = el.querySelector<HTMLButtonElement>("[data-active='true']");
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedIndex]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <div className="relative h-screen overflow-hidden bg-base-100">
      <div className="h-full">
        <div className="relative h-full">
          <div ref={emblaRef} className="h-full overflow-hidden">
            <div className="flex">
              {SLIDES.map((slide, index) => (
                <div key={slide.title} className="history-slide min-w-0 flex-[0_0_100%]">
                  <div className="relative h-screen overflow-hidden bg-base-200">
                    <div className="absolute inset-0">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/50 to-base-100/20" />
                    </div>

                    <div className="relative z-10 flex h-full items-end md:items-center px-6 py-16 md:px-12">
                      <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                          {slide.label}
                        </p>
                        <h1 className="mt-3 text-4xl font-bold md:text-6xl">{slide.title}</h1>
                        {slide.subtitle && (
                          <p className="mt-4 text-lg md:text-2xl text-base-content/80">{slide.subtitle}</p>
                        )}
                        <div className="mt-6 space-y-4 text-base-content/80 leading-relaxed md:text-lg">
                          {slide.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                        <p className="mt-8 text-sm font-semibold text-base-content/60">
                          {index + 1} / {SLIDES.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-4 p-4 md:p-6">
            <button type="button" className="btn btn-circle" aria-label="Previous slide" onClick={scrollPrev} disabled={!emblaApi}>
              ‹
            </button>

            <div ref={navRef} className="flex-1 overflow-x-auto scroll-smooth">
              <div className="flex items-center gap-2 min-w-max px-1">
                {slideButtons.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => scrollTo(i)}
                    data-active={i === selectedIndex ? "true" : "false"}
                    className={`btn btn-sm rounded-full transition-colors ${i === selectedIndex ? "btn-primary" : "btn-ghost"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className="btn btn-circle" aria-label="Next slide" onClick={scrollNext} disabled={!emblaApi}>
              ›
            </button>
          </div>

          {/* Back Button */}
          <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
            <a href="/about" className="btn btn-primary btn-sm md:btn-md">
              Back to About
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}