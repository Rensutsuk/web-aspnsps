"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";

import { useBreakpointValue } from "@chakra-ui/react";

import { Hero } from "@/components/home/Hero";
import { HomeBlogList } from "@/components/home/HomeBlogList";
import { ImageScroll } from "@/components/home/ImageScroll";
import type { BlogPostSummary } from "@/features/blog/types";

type AnimatedSectionProps = {
  index: number;
  children: React.ReactNode;
};

type HomeScrollSectionsProps = {
  posts: BlogPostSummary[];
};

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

function AnimatedSection({ index, children }: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { amount: 0.55, once: false });
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const variants = useMemo(() => {
    if (reduceMotion) {
      return {
        hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
        visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.01 } },
      } as const;
    }

    if (index === 0) {
      return {
        hidden: { opacity: 0, y: 18, scale: 1.01 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.72,
            ease: easeOut,
          },
        },
      } as const;
    }

    if (index === 1) {
      return {
        hidden: { opacity: 0, y: isMobile ? 22 : 34 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.68,
            ease: easeOut,
          },
        },
      } as const;
    }

    return {
      hidden: { opacity: 0, y: isMobile ? 24 : 40, x: isMobile ? 0 : -8 },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.76,
          ease: easeOut,
        },
      },
    } as const;
  }, [index, isMobile, reduceMotion]);

  const wrapVariants = useMemo(() => {
    if (reduceMotion) {
      return {
        hidden: {},
        visible: { transition: { staggerChildren: 0 } },
      } as const;
    }

    if (index === 1) {
      return {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: isMobile ? 0.06 : 0.1,
          },
        },
      } as const;
    }

    return {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0,
        },
      },
    } as const;
  }, [index, isMobile, reduceMotion]);

  return (
    <motion.section
      ref={ref}
      data-snap-section
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        willChange: "transform, opacity",
      }}
      variants={wrapVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div style={{ transformOrigin: "50% 40%", willChange: "transform, opacity" }} variants={variants}>
        {children}
      </motion.div>
    </motion.section>
  );
}

export function HomeScrollSections({ posts }: HomeScrollSectionsProps) {
  const sections = [
    <Hero key="hero" />,
    <HomeBlogList key="announcements" posts={posts} />,
    <ImageScroll key="moments" />,
  ];

  return (
    <>
      {sections.map((child, idx) => (
        <AnimatedSection key={`section-${idx}`} index={idx}>
          {child}
        </AnimatedSection>
      ))}
    </>
  );
}
