'use client';

import Image from 'next/image';
import {
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa6';
import { FaTiktok, FaChevronDown } from 'react-icons/fa';

export default function ContactUs() {
  const handleScrollNext = () => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'));
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
    next?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="absolute inset-0" />
      </div>

      <div className="relative z-10 w-full h-[calc(100vh-8vh)] bg-base-100 mt-15 md:mt-20 lg:mt-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center select-none z-0">
          <Image
            src="/img/home/home-bg.png"
            alt="Contact watermark"
            fill
            priority={false}
            className="w-full h-80vh object-cover md:object-contain"
          />
        </div>

        <div className="relative z-10 h-full w-full md:px-12 lg:px-20 xl:px-28 md:py-8 lg:py-10 flex flex-col">
          {/* ========== MD / LG / XL (≥768px) — 2-COL LAYOUT ========== */}
          <div className="relative h-full w-full hidden md:grid grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:gap-16 items-start">
            <div className="space-y-6 md:space-y-7 lg:space-y-8 h-full flex flex-col">
              <div className="self-start">
                <h1 className="text-primary dark:text-primary-content text-2xl md:text-4xl lg:text-5xl font-black tracking-wider uppercase pb-3 border-b-4 border-primary dark:border-primary-content/70 inline-block">
                  CONTACT US
                </h1>
              </div>

              <ul className="space-y-3 md:space-y-4 lg:space-y-5">
                <li className="flex items-start gap-3 md:gap-4 lg:gap-5">
                  <span className="shrink-0 mt-0.5 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg md:text-xl lg:text-2xl">
                    <FaLocationDot />
                  </span>
                  <a className="text-sm md:text-base lg:text-xl text-base-content pt-1 md:pt-1.5" href='https://maps.app.goo.gl/virT5NJPjgCFcxnL8' target="_blank" rel="noopener noreferrer">
                    2042 Calamba St. corner Instruccion St., Sampaloc, Manila
                  </a>
                </li>

                <li className="flex items-center gap-3 md:gap-4 lg:gap-5">
                  <span className="shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg md:text-xl lg:text-2xl">
                    <FaPhone />
                  </span>
                  <a className="text-sm md:text-base lg:text-xl text-base-content" href="tel:0287418010">
                    (02) 8741 8010
                  </a>
                </li>

                <li className="flex items-center gap-3 md:gap-4 lg:gap-5">
                  <span className="shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg md:text-xl lg:text-2xl">
                    <FaEnvelope />
                  </span>
                  <a className="text-sm md:text-base lg:text-xl text-base-content" href="mailto:nsps_parish@yahoo.com">
                    nsps_parish@yahoo.com
                  </a>
                </li>

                <li className="flex items-center gap-3 md:gap-4 lg:gap-5">
                  <span className="shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg md:text-xl lg:text-2xl">
                    <FaFacebookF />
                  </span>
                  <a className="text-sm md:text-base lg:text-xl text-base-content" href="https://www.facebook.com/aspnspsofficial" target="_blank" rel="noopener noreferrer">
                    facebook.com/aspnspsofficial
                  </a>
                </li>

                <li className="flex items-center gap-3 md:gap-4 lg:gap-5">
                  <span className="shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg md:text-xl lg:text-2xl">
                    <FaInstagram />
                  </span>
                  <a className="text-sm md:text-base lg:text-xl text-base-content" href="https://www.instagram.com/aspnspsofficial/" target="_blank" rel="noopener noreferrer">
                    instagram.com/aspnspsofficial
                  </a>
                </li>

                <li className="flex items-center gap-3 md:gap-4 lg:gap-5">
                  <span className="shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg md:text-xl lg:text-2xl">
                    <FaTiktok />
                  </span>
                  <a className="text-sm md:text-base lg:text-xl text-base-content" href="https://www.tiktok.com/@aspnspsofficial" target="_blank" rel="noopener noreferrer">
                    tiktok.com/@aspnspsofficial
                  </a>
                </li>
              </ul>

              <div className="mt-auto pt-4 text-center md:text-left text-primary dark:text-primary-content">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex md:justify-start justify-center mb-2">
                    <Image
                      src="/logo.png"
                      alt="ASPNSPS seal"
                      width={64}
                      height={64}
                      className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] text-primary/90 dark:text-primary-content/85 mb-0.5">
                    Archdiocesan Shrine and Parish of Nuestra Señora del
                  </p>
                  <p className="font-[family-name:var(--font-cinzel-decorative)] text-xl sm:text-2xl md:text-3xl font-black uppercase leading-none text-primary dark:text-primary-content">
                    Perpetuo Socorro
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm mt-2 text-primary/80 dark:text-primary-content/70 tracking-wider">
                    &copy; COPYRIGHT 2026 | All Rights Reserved
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end items-center h-full">
              <div className="relative w-full max-w-sm md:max-w-md h-full flex items-center justify-center">
                <Image
                  src="/img/home/omph-icon.png"
                  alt="Nuestra Señora del Perpetuo Socorro Icon"
                  className="h-auto max-h-[88%] w-auto object-contain"
                  width={600}
                  height={800}
                  priority
                  sizes="(max-width: 768px) 72vw, (max-width: 1024px) 38vw, 360px"
                />
              </div>
            </div>
          </div>

          {/* ========== SM / XS (<768px) — SINGLE COLUMN STACK ========== */}
          <div className="relative h-full w-full px-4 sm:px-6 py-4 flex flex-col md:hidden overflow-y-auto">
            <div className="self-center">
              <h1 className="text-primary dark:text-primary-content text-2xl sm:text-3xl font-black tracking-wider uppercase pb-2 border-b-4 border-primary dark:border-primary-content/70 inline-block">
                CONTACT US
              </h1>
            </div>

            <ul className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="shrink-0 mt-0.5 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg sm:text-xl">
                  <FaLocationDot />
                </span>
                <a className="text-sm sm:text-base text-base-content pt-1" href="https://maps.app.goo.gl/virT5NJPjgCFcxnL8" target="_blank" rel="noopener noreferrer">
                  2042 Calamba St. corner Instruccion St., Sampaloc, Manila
                </a>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <span className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg sm:text-xl">
                  <FaPhone />
                </span>
                <a className="text-sm sm:text-base text-base-content" href="tel:0287418010">
                  (02) 8741 8010
                </a>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <span className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg sm:text-xl">
                  <FaEnvelope />
                </span>
                <a className="text-sm sm:text-base text-base-content" href="mailto:nsps_parish@yahoo.com">
                  nsps_parish@yahoo.com
                </a>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <span className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg sm:text-xl">
                  <FaFacebookF />
                </span>
                <a className="text-sm sm:text-base text-base-content" href="https://www.facebook.com/aspnspsofficial/" target="_blank" rel="noopener noreferrer">
                  facebook.com/aspnspsofficial
                </a>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <span className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg sm:text-xl">
                  <FaInstagram />
                </span>
                <a className="text-sm sm:text-base text-base-content" href="https://www.instagram.com/aspnspsofficial/" target="_blank" rel="noopener noreferrer">
                  instagram.com/aspnspsofficial
                </a>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <span className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-primary dark:border-primary-content/60 flex items-center justify-center text-primary dark:text-primary-content text-lg sm:text-xl">
                  <FaTiktok />
                </span>
                <a className="text-sm sm:text-base text-base-content" href="https://www.tiktok.com/@aspnspsofficial" target="_blank" rel="noopener noreferrer">
                  tiktok.com/aspnspsofficial
                </a>
              </li>
            </ul>

            <div className="flex justify-center my-4 sm:my-6">
              <Image
                src="/img/home/omph-icon.png"
                alt="Nuestra Señora del Perpetuo Socorro Icon"
                className="w-full max-w-[72%] h-auto"
                width={600}
                height={800}
                sizes="72vw"
              />
            </div>

            <div className="pt-2 sm:pt-4 text-center text-primary dark:text-primary-content mt-auto pb-16 sm:pb-20">
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center mb-2">
                  <Image
                    src="/logo.png"
                    alt="ASPNSPS seal"
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                  />
                </div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-primary/90 dark:text-primary-content/85 mb-0.5">
                  Archdiocesan Shrine and Parish of <br></br> Nuestra Señora del
                </p>
                <p className="font-[family-name:var(--font-cinzel-decorative)] text-xl sm:text-2xl font-black uppercase leading-none text-primary dark:text-primary-content">
                  Perpetuo Socorro
                </p>
                <p className="text-[10px] sm:text-xs mt-2 text-primary/80 dark:text-primary-content/70 tracking-wider">
                  &copy; COPYRIGHT 2026 | All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleScrollNext}
          aria-label="Scroll down"
          className="z-20 absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-primary hover:text-accent hover:-translate-y-1 transition-all duration-300 animate-bounce"
        >
          <FaChevronDown className="w-full h-full" />
        </button>
      </div>
    </section>
  );
}
