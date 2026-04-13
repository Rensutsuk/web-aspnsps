"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaHandHoldingHeart, FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";

type Program = {
  title: string;
  description: string;
  image: string;
};

const PROGRAMS: Program[] = [
  {
    title: "Church Maintenance",
    description: "Upkeep and repairs for the church, chapel, facilities, and utilities.",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MRmF5GzONjIzrhcLZFMG7lqYpdQCf9vaRBPD0"
  },
  {
    title: "Liturgical Needs",
    description: "Mass essentials such as candles, vestments, missals, and sanctuary supplies.",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MouryarDFvpgnQWkasj82S6td5AU4DmGhYlJP"
  },
  {
    title: "Charity & Outreach",
    description: "Assistance for those in need through parish outreach and relief efforts.",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MuRPWdcytIDoBjJxUblWz0sKTOdm7Vr8fYgeS"
  },
  {
    title: "Youth & Faith Formation",
    description: "Catechesis, formation programs, retreats, and youth ministry activities.",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MhI7c1tB2LP0wvXgsoy3JMI8AC76aUrZl9hj5"
  },
  {
    title: "Community Programs",
    description: "Parish-led initiatives that serve families and strengthen community life.",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MbvH3QrGLyvMAWJhlH1NdjqYFIoKmBauPO9iE"
  },
  {
    title: "Parish Operations",
    description: "Office needs and administrative support to keep parish services running smoothly.",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MHmvUqcs7GSuO350hliR2PAUkwfTqjWtKgBIo"
  }
];

export default function DonatePage() {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const pages = useMemo(() => {
    const result: Program[][] = [];
    for (let i = 0; i < PROGRAMS.length; i += itemsPerPage) {
      result.push(PROGRAMS.slice(i, i + itemsPerPage));
    }
    return result;
  }, [itemsPerPage]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setItemsPerPage(mq.matches ? 2 : 1);
    };

    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0 });
  }, [itemsPerPage]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || pages.length <= 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      const width = el.clientWidth || 1;
      const current = Math.round(el.scrollLeft / width);
      const next = (current + 1) % pages.length;
      el.scrollTo({ left: next * width, behavior: "smooth" });
    }, 5000);

    return () => window.clearInterval(id);
  }, [pages.length]);

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Our Parish</h1>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Your generous donations help us maintain our church, support our
            community programs, and continue our mission of serving God and our
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 max-w-screen">
          {/* Bank Transfer Section */}
          <div className="mb-8 md:mb-0 lg:mb-0 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <FaMoneyBillWave className="text-3xl text-primary" />
              <h2 className="text-3xl font-bold">Bank Transfer</h2>
            </div>
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">BPI</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Account Name:</span> RCAM -
                    Archdiocesan Shrine of Nuestra Señora Del Perpetuo Socorro
                  </p>
                  <p>
                    <span className="font-semibold">Short Account Name:</span>{" "}
                    RCAM - NSPS Shrine
                  </p>
                  <p>
                    <span className="font-semibold">Alternate Number:</span>{" "}
                    000311-0181-59
                  </p>
                  <p>
                    <span className="font-semibold">Branch:</span> BPI Retiro,
                    Quezon City
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Ways to Give */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <FaHandHoldingHeart className="text-3xl text-primary" />
              <h2 className="text-3xl font-bold">Other Ways to Give</h2>
            </div>
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">In-Person Donations</h3>
                <p className="mb-4">
                  You can also give your donations directly at the parish office
                  during office hours or during mass collections.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Programs Supported by Donations</h2>
            <p className="text-base text-base-content/80 max-w-3xl mx-auto mt-3">
              Your gifts directly support parish life and outreach. Below are some of the programs and needs your donations help fund.
            </p>
          </div>

          <div
            ref={carouselRef}
            className="overflow-x-auto snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex w-full">
              {pages.map((page, pageIndex) => (
                <div key={pageIndex} className="w-full shrink-0 snap-start px-1 pb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {page.map((program) => (
                      <div key={program.title} className="card bg-base-200 shadow-lg overflow-hidden">
                        <div className="relative h-72">
                          <Image
                            src={program.image}
                            alt={program.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/70 to-transparent" />
                          <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h3 className="text-xl font-bold">{program.title}</h3>
                            <p className="text-base-content/80 mt-2">{program.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
