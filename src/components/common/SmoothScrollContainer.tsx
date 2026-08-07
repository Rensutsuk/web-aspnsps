"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

import { Box, Button, VStack } from "@chakra-ui/react";

type SmoothScrollContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  mdStyle?: React.CSSProperties;
  mode?: "buffered" | "paged";
  showPager?: boolean;
};

type ScrollConfig = {
  duration: number;
  wheelCooldown: number;
  wheelThreshold: number;
  snapEndBuffer: number;
  touchMultiplier: number;
  smoothWheel: boolean;
};

const DESKTOP_PAGED: ScrollConfig = {
  duration: 0.76,
  wheelCooldown: 120,
  wheelThreshold: 6,
  snapEndBuffer: 80,
  touchMultiplier: 1.35,
  smoothWheel: true,
};

const MOBILE_PAGED: ScrollConfig = {
  duration: 0.62,
  wheelCooldown: 80,
  wheelThreshold: 8,
  snapEndBuffer: 140,
  touchMultiplier: 1.9,
  smoothWheel: true,
};

const DESKTOP_BUFFERED: ScrollConfig = {
  duration: 0.62,
  wheelCooldown: 60,
  wheelThreshold: 4,
  snapEndBuffer: 180,
  touchMultiplier: 1.55,
  smoothWheel: true,
};

const MOBILE_BUFFERED: ScrollConfig = {
  duration: 0.52,
  wheelCooldown: 50,
  wheelThreshold: 6,
  snapEndBuffer: 220,
  touchMultiplier: 2.0,
  smoothWheel: true,
};

const REDUCED_MOTION: ScrollConfig = {
  duration: 0.18,
  wheelCooldown: 40,
  wheelThreshold: 2,
  snapEndBuffer: 260,
  touchMultiplier: 2.2,
  smoothWheel: false,
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function isTouchPrimary() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) return true;
  return false;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScrollContainer({
  children,
  className,
  style,
  mdStyle,
  mode = "buffered",
  showPager = false,
}: SmoothScrollContainerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapTotal, setSnapTotal] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollToIndexRef = useRef<(index: number) => void>(() => undefined);
  const rafPendingRef = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const isTouch = isTouchPrimary();
    const reduceMotion = prefersReducedMotion();
    const paged = mode === "paged";
    const effectiveMode = reduceMotion ? "buffered" : mode;

    let cfg: ScrollConfig;
    if (reduceMotion) {
      cfg = REDUCED_MOTION;
    } else if (paged) {
      cfg = isTouch ? MOBILE_PAGED : DESKTOP_PAGED;
    } else {
      cfg = isTouch ? MOBILE_BUFFERED : DESKTOP_BUFFERED;
    }

    const lenis = new Lenis({
      wrapper,
      content,
      duration: cfg.duration,
      smoothWheel: cfg.smoothWheel && effectiveMode !== "buffered",
      syncTouch: false,
      touchMultiplier: cfg.touchMultiplier,
      easing: easeInOutCubic,
      autoResize: true,
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

    const getScrollPaddingTop = () => {
      const styleTop = wrapper.style.paddingTop;
      if (styleTop && styleTop.endsWith("px")) {
        return Number.parseFloat(styleTop) || 0;
      }
      return 64;
    };

    const computeSnapTargetsNow = () => {
      const sections = Array.from(content.querySelectorAll<HTMLElement>(snapSelector));
      const paddingTop = getScrollPaddingTop();
      snapTargets = sections
        .map((el) => el.offsetTop - paddingTop)
        .filter((v, idx, arr) => idx === 0 || v !== arr[idx - 1]);
      snapCount = snapTargets.length;
      setSnapTotal(snapCount);
    };

    const scheduleComputeSnapTargets = () => {
      if (rafPendingRef.current) return;
      rafPendingRef.current = window.requestAnimationFrame(() => {
        rafPendingRef.current = 0;
        computeSnapTargetsNow();
      });
    };

    scheduleComputeSnapTargets();

    const observer = new MutationObserver(() => {
      scheduleComputeSnapTargets();
    });
    observer.observe(content, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(() => {
      scheduleComputeSnapTargets();
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
      if (nextIndex === activeIndexRef.current && Math.abs(wrapper.scrollTop - snapTargets[nextIndex]) < 2) {
        return;
      }

      isSnapping = true;
      window.clearTimeout(snapTimer);
      window.clearTimeout(updateIndexTimer);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      lenis.scrollTo(snapTargets[nextIndex], {
        immediate: false,
        duration: cfg.duration,
        easing: paged && !reduceMotion ? easeOutCubic : easeInOutCubic,
      });

      const lockMs = Math.max(220, Math.round(cfg.duration * 1000 + 20));
      snapTimer = window.setTimeout(() => {
        isSnapping = false;
      }, lockMs);

      updateIndexTimer = window.setTimeout(() => {
        updateActiveIndexFromScroll();
      }, Math.max(260, Math.round(cfg.duration * 1000 - 80)));
    };

    scrollToIndexRef.current = scrollToIndex;

    const snapToNearest = () => {
      if (snapTargets.length <= 1) return;
      if (isSnapping) return;
      if (reduceMotion) return;

      const current = wrapper.scrollTop + wrapper.clientHeight * 0.2;
      const closest = getClosestIndex(current);
      const target = snapTargets[closest];
      const distance = Math.abs(target - wrapper.scrollTop);
      if (distance < 8) return;

      scrollToIndex(closest);
    };

    const onScroll = () => {
      if (snapTargets.length === 0) return;
      if (isSnapping) return;

      updateActiveIndexFromScroll();

      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        if (effectiveMode === "paged") {
          snapToNearest();
        }
      }, cfg.snapEndBuffer);
    };

    wrapper.addEventListener("scroll", onScroll, { passive: true });

    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      const tag = target.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || tag === "select" || Boolean(target.closest("[contenteditable='true']"));
    };

    const onWheel = (event: WheelEvent) => {
      if (effectiveMode !== "paged") return;
      if (snapCount <= 1) return;
      if (isEditableTarget(event.target)) return;
      if (reduceMotion) return;
      if (isTouch) return;

      event.preventDefault();

      if (isSnapping) return;
      if (wheelCooldownTimer) return;

      wheelAccumulator += event.deltaY;
      if (!wheelWindowTimer) {
        wheelWindowTimer = window.setTimeout(() => {
          wheelAccumulator = 0;
          wheelWindowTimer = 0;
        }, 90);
      }

      if (Math.abs(wheelAccumulator) < cfg.wheelThreshold) return;

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
      }, cfg.wheelCooldown);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (effectiveMode !== "paged") return;
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

    const reducedMotionListener = (e: MediaQueryListEvent) => {
      lenis.options.smoothWheel = !e.matches;
    };

    const pointerMedia = window.matchMedia("(pointer: coarse)");
    const pointerListener = () => {
      const touch = pointerMedia.matches || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
      lenis.options.touchMultiplier = touch
        ? (reduceMotion ? REDUCED_MOTION.touchMultiplier : paged ? MOBILE_PAGED.touchMultiplier : MOBILE_BUFFERED.touchMultiplier)
        : (reduceMotion ? REDUCED_MOTION.touchMultiplier : paged ? DESKTOP_PAGED.touchMultiplier : DESKTOP_BUFFERED.touchMultiplier);
    };

    const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMedia.addEventListener?.("change", reducedMotionListener);
    pointerMedia.addEventListener?.("change", pointerListener);

    const useNonPassiveWheel = effectiveMode === "paged" && !isTouch && !reduceMotion;
    wrapper.addEventListener("wheel", onWheel, { passive: !useNonPassiveWheel });
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
      reducedMedia.removeEventListener?.("change", reducedMotionListener);
      pointerMedia.removeEventListener?.("change", pointerListener);
      window.clearTimeout(snapTimer);
      window.clearTimeout(scrollEndTimer);
      window.clearTimeout(updateIndexTimer);
      if (wheelWindowTimer) window.clearTimeout(wheelWindowTimer);
      if (wheelCooldownTimer) window.clearTimeout(wheelCooldownTimer);
      if (rafPendingRef.current) window.cancelAnimationFrame(rafPendingRef.current);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [mode]);

  return (
    <Box
      ref={wrapperRef}
      className={className}
      style={style}
      sx={mdStyle ? { "@media screen and (min-width: 48em)": mdStyle } : undefined}
    >
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
