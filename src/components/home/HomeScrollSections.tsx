"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Hero } from "@/components/home/Hero";
import { HomeBlogList } from "@/components/home/HomeBlogList";
import { ImageScroll } from "@/components/home/ImageScroll";
import type { BlogPostSummary } from "@/features/blog/types";

type AnimatedSectionProps = {
  children: React.ReactNode;
};

type HomeScrollSectionsProps = {
  posts: BlogPostSummary[];
};

function AnimatedSection({ children }: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { amount: 0.55 });

  return (
    <motion.section
      ref={ref}
      data-snap-section
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      animate={{
        opacity: isInView ? 1 : 0.92,
        filter: isInView ? "blur(0px)" : "blur(1.5px)",
        y: isInView ? 0 : 28,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function HomeScrollSections({ posts }: HomeScrollSectionsProps) {
  return (
    <>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <HomeBlogList posts={posts} />
      </AnimatedSection>
      <AnimatedSection>
        <ImageScroll />
      </AnimatedSection>
    </>
  );
}
