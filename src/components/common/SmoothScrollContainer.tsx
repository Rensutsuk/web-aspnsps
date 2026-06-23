"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

import { Box, Button, VStack } from "@chakra-ui/react";

type SmoothScrollContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  mode?: "buffered" | "paged";
  showPager?: boolean;
};

export function SmoothScrollContainer({
  children,
  className,
  style,
  mode = "buffered",
  showPager = false,
}: SmoothScrollContainerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapTotal, setSnapTotal] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollToIndexRef = useRef<(index: number) => void>(() => undefined);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    const snapSelector = "[data-snap-section]";
    let snapTargets: number[] = [];
    let snapCount = 0;
    let isSnapping = false;
    let snapTimer = 0;
    let scrollEndTimer = 0;
    let wheelCooldownTimer = 0;
    let wheelAccumulator = 0;
    let updateIndexTimer = 0;
    let wheelWindowTimer = 0;

    const computeSnapTargets = () => {
      const sections = Array.from(content.querySelectorAll<HTMLElement>(snapSelector));
      snapTargets = sections
        .map((el) => el.offsetTop)
        .filter((v, idx, arr) => idx === 0 || v !== arr[idx - 1]);
      snapCount = snapTargets.length;
      setSnapTotal(snapCount);
    };

    computeSnapTargets();

    const observer = new MutationObserver(() => {
      computeSnapTargets();
    });
    observer.observe(content, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(() => {
      computeSnapTargets();
    });
    resizeObserver.observe(content);

    const getClosestIndex = (y: number) => {
      if (snapTargets.length === 0) return 0;
      let bestIdx = 0;
      let bestDist = Math.abs(snapTargets[0] - y);
      for (let i = 1; i < snapTargets.length; i += 1) {
        const d = Math.abs(snapTargets[i] - y);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      return bestIdx;
    };

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const updateActiveIndexFromScroll = () => {
      if (snapTargets.length === 0) return;
      const current = wrapper.scrollTop + wrapper.clientHeight * 0.25;
      const idx = getClosestIndex(current);
      if (idx !== activeIndexRef.current) {
        activeIndexRef.current = idx;
        setActiveIndex(idx);
      }
    };

    const scrollToIndex = (index: number) => {
      if (snapTargets.length === 0) return;
      const nextIndex = Math.max(0, Math.min(index, snapTargets.length - 1));
      if (nextIndex === activeIndexRef.current && Math.abs(wrapper.scrollTop - snapTargets[nextIndex]) < 2) return;

      isSnapping = true;
      window.clearTimeout(snapTimer);
      window.clearTimeout(updateIndexTimer);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      lenis.scrollTo(snapTargets[nextIndex], {
        immediate: false,
        duration: mode === "paged" ? 1.25 : 1.05,
        easing: easeOutCubic,
      });

      snapTimer = window.setTimeout(() => {
        isSnapping = false;
      }, 1100);

      updateIndexTimer = window.setTimeout(() => {
        updateActiveIndexFromScroll();
      }, 600);
    };

    scrollToIndexRef.current = scrollToIndex;

    const snapToNearest = () => {
      if (snapTargets.length <= 1) return;
      if (isSnapping) return;

      const current = wrapper.scrollTop + wrapper.clientHeight * 0.2;
      const closest = getClosestIndex(current);
      const target = snapTargets[closest];
      const distance = Math.abs(target - wrapper.scrollTop);
      if (distance < 8) return;

      scrollToIndex(closest);
    };

    const onScroll = () => {
      if (snapTargets.length <= 0.5) return;
      if (isSnapping) return;

      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        snapToNearest();
      }, mode === "paged" ? 60 : 140);
    };

    wrapper.addEventListener("scroll", onScroll, { passive: true });

    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      const tag = target.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || tag === "select" || Boolean(target.closest("[contenteditable='true']"));
    };

    const onWheel = (event: WheelEvent) => {
      if (mode !== "paged") return;
      if (snapCount <= 1) return;
      if (isEditableTarget(event.target)) return;

      event.preventDefault();

      if (isSnapping) return;
      if (wheelCooldownTimer) return;

      wheelAccumulator += event.deltaY;
      if (!wheelWindowTimer) {
        wheelWindowTimer = window.setTimeout(() => {
          wheelAccumulator = 0;
          wheelWindowTimer = 0;
        }, 120);
      }

      if (Math.abs(wheelAccumulator) < 8) return;

      const direction = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;
      if (wheelWindowTimer) {
        window.clearTimeout(wheelWindowTimer);
        wheelWindowTimer = 0;
      }

      const next = activeIndexRef.current + direction;
      scrollToIndex(next);

      wheelCooldownTimer = window.setTimeout(() => {
        wheelCooldownTimer = 0;
      }, 160);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (mode !== "paged") return;
      if (snapCount <= 1) return;
      if (isEditableTarget(event.target)) return;

      const key = event.key;
      const nextKeys = new Set(["ArrowDown", "PageDown", " ", "Enter"]);
      const prevKeys = new Set(["ArrowUp", "PageUp"]);

      if (key === "Home") {
        event.preventDefault();
        scrollToIndex(0);
        return;
      }

      if (key === "End") {
        event.preventDefault();
        scrollToIndex(snapTargets.length - 1);
        return;
      }

      if (nextKeys.has(key)) {
        event.preventDefault();
        scrollToIndex(activeIndexRef.current + 1);
        return;
      }

      if (prevKeys.has(key)) {
        event.preventDefault();
        scrollToIndex(activeIndexRef.current - 1);
      }
    };

    wrapper.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      scrollToIndexRef.current = () => undefined;
      wrapper.removeEventListener("scroll", onScroll);
      wrapper.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(snapTimer);
      window.clearTimeout(scrollEndTimer);
      window.clearTimeout(updateIndexTimer);
      if (wheelWindowTimer) window.clearTimeout(wheelWindowTimer);
      if (wheelCooldownTimer) window.clearTimeout(wheelCooldownTimer);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [mode]);

  return (
    <Box ref={wrapperRef} className={className} style={style}>
      <Box ref={contentRef}>{children}</Box>

      {showPager && snapTotal > 1 ? (
        <Box position="fixed" right={{ base: 3, md: 5 }} top="50%" transform="translateY(-50%)" zIndex={60}>
          <VStack spacing={2} bg="whiteAlpha.700" _dark={{ bg: "blackAlpha.500" }} p={2} borderRadius="full" backdropFilter="blur(10px)">
            {Array.from({ length: snapTotal }).map((_, idx) => (
              <Button
                key={`snap-${idx}`}
                aria-label={`Go to section ${idx + 1}`}
                size="xs"
                minW={0}
                w="10px"
                h="10px"
                p={0}
                borderRadius="full"
                variant="solid"
                bg={idx === activeIndex ? "brand.600" : "whiteAlpha.600"}
                _dark={{ bg: idx === activeIndex ? "brand.300" : "whiteAlpha.400" }}
                onClick={() => scrollToIndexRef.current(idx)}
              />
            ))}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
}
