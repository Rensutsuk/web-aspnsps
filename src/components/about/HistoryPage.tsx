"use client";

import Image from "next/image";
import NextLink from "next/link";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    image: "/img/about/church-building.jpg",
    paragraphs: [
      "Explore the major moments that shaped the parish, from its humble beginnings to its continuing mission today.",
      "Each chapter highlights the people, milestones, and developments that built the community through the years.",
    ],
  },
  {
    label: "1951",
    title: "1951: The Foundation",
    image: "/img/about/church-building.jpg",
    paragraphs: [
      "From being a part of the Parish of Espiritu Santo, the newborn parish was erected on August 28, 1951, by His Eminence Manila Archbishop Gabriel Reyes. Fr. Candido Bernal was installed as the first parish priest by Msgr. Narciso Gatpaydan.",
      "The present site, formerly a 13-hectare lot called 'Lumang Tinapay', was a swampy area where grass and kangkong thrived. The parish began with a small wooden chapel, funded by an initial P5000 from Archbishop Gabriel Reyes.",
    ],
  },
  {
    label: "1966–1969",
    title: "1966–1969: Growth and Development",
    image: "/img/about/church-building.jpg",
    paragraphs: [
      "The cornerstone laying of the permanent church was officiated by the first Filipino prince of the church, Archbishop Rufino Cardinal Santos on November 20, 1966.",
      "During the construction, Fr. Bernal established the community structure and strengthened formation programs. His dedication led to his appointment as Privy Chamberlain on June 29, 1969.",
    ],
  },
  {
    label: "1970–1976",
    title: "1970–1976: Expansion and Celebration",
    image: "/img/about/church-building.jpg",
    paragraphs: [
      "In 1970, the parochial boundaries were redefined between NSPS of Manila and Sta. Teresita Parish in Quezon City. The parish celebrated its Silver Jubilee on October 4, 1976, with Cardinal Jaime Sin officiating the thanksgiving mass.",
    ],
  },
  {
    label: "1984–1989",
    title: "1984–1989: Further Development",
    image: "/img/about/church-building.jpg",
    paragraphs: [
      "Construction of the multi-purpose center began in 1984 and was completed in 1988. In 1989, Fr. Bernal retired after 38 years of service. Fr. Honorato Nadua became the second parish priest, initiating the construction of the rectory and Adoration Chapel.",
    ],
  },
  {
    label: "2001–Present",
    title: "2001–Present: Modern Era",
    image: "/img/about/church-building.jpg",
    paragraphs: [
      "The parish celebrated its Golden Jubilee on October 6, 2001, with Bishop Teodoro Buhain presiding. In 2005, the Nuestra Senora Del Perpetuo Socorro Foundation was established to provide scholarships and conduct community development programs.",
      "Since 2006, Fr. Jerome Secillano, the 4th pastor, has been leading the parish's continued growth and development.",
    ],
  },
];

export function HistoryPage() {
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
    <Box position="relative" h="100dvh" overflow="hidden" bg="white" mt="-64px" _dark={{ bg: "gray.900" }}>
      <Box ref={emblaRef} h="full" overflow="hidden">
        <Box display="flex">
          {SLIDES.map((slide, index) => (
            <Box key={slide.title} className="history-slide" minW={0} flex="0 0 100%">
              <Box position="relative" h="100dvh" overflow="hidden" bg="gray.50" _dark={{ bg: "gray.800" }}>
                <Box position="absolute" inset={0}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    style={{ objectFit: "cover" }}
                  />
                  <Box position="absolute" inset={0} bgGradient="linear(to-r, white, whiteAlpha.700, whiteAlpha.200)" />
                  <Box
                    position="absolute"
                    inset={0}
                    _dark={{ bgGradient: "linear(to-r, gray.900, rgba(17,24,39,0.55), rgba(17,24,39,0.2))" }}
                  />
                </Box>

                <Box
                  position="relative"
                  zIndex={10}
                  h="full"
                  px={{ base: 6, md: 12 }}
                  py={{ base: 16, md: 16 }}
                  display="flex"
                  alignItems={{ base: "flex-end", md: "center" }}
                >
                  <Box maxW="3xl">
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      textTransform="uppercase"
                      letterSpacing="0.2em"
                      color="brand.700"
                      _dark={{ color: "brand.200" }}
                    >
                      {slide.label}
                    </Text>
                    <Heading mt={3} fontSize={{ base: "4xl", md: "6xl" }} lineHeight="shorter">
                      {slide.title}
                    </Heading>
                    {slide.subtitle ? (
                      <Text mt={4} fontSize={{ base: "lg", md: "2xl" }} color="gray.700" _dark={{ color: "gray.200" }}>
                        {slide.subtitle}
                      </Text>
                    ) : null}
                    <Box mt={6}>
                      {slide.paragraphs.map((paragraph) => (
                        <Text key={paragraph} mt={4} fontSize={{ base: "md", md: "lg" }} color="gray.700" _dark={{ color: "gray.200" }}>
                          {paragraph}
                        </Text>
                      ))}
                    </Box>
                    <Text mt={8} fontSize="sm" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
                      {index + 1} / {SLIDES.length}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box position="absolute" insetX={0} bottom={0} zIndex={20} display="flex" alignItems="center" gap={4} p={{ base: 4, md: 6 }}>
        <IconButton
          aria-label="Previous slide"
          icon={<ChevronLeft size={18} />}
          onClick={scrollPrev}
          isDisabled={!emblaApi}
          colorScheme="brand"
          borderRadius="full"
        />

        <Box ref={navRef} flex="1" overflowX="auto" scrollBehavior="smooth">
          <HStack spacing={2} minW="max-content" px={1}>
            {slideButtons.map((label, i) => (
              <Button
                key={label}
                size="sm"
                borderRadius="full"
                onClick={() => scrollTo(i)}
                data-active={i === selectedIndex ? "true" : "false"}
                variant={i === selectedIndex ? "solid" : "ghost"}
                colorScheme="brand"
                flexShrink={0}
              >
                {label}
              </Button>
            ))}
          </HStack>
        </Box>

        <IconButton
          aria-label="Next slide"
          icon={<ChevronRight size={18} />}
          onClick={scrollNext}
          isDisabled={!emblaApi}
          colorScheme="brand"
          borderRadius="full"
        />
      </Box>

      <Box position="absolute" right={{ base: 4, md: 6 }} top={{ base: 4, md: 6 }} zIndex={20}>
        <Button as={NextLink} href="/about" colorScheme="brand" size="sm">
          Back to About
        </Button>
      </Box>
    </Box>
  );
}
