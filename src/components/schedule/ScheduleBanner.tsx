"use client";

import Image from "next/image";

import { Box } from "@chakra-ui/react";

type ScheduleBannerProps = {
  src: string;
  alt: string;
};

export function ScheduleBanner({ src, alt }: ScheduleBannerProps) {
  return (
    <Box position="relative" w="full" borderRadius="xl" overflow="hidden" minH={{ base: 180, md: 240 }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 1024px" style={{ objectFit: "cover" }} />
      <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.700, transparent)" />
    </Box>
  );
}

