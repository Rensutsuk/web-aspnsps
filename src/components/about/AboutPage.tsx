"use client";

import Image from "next/image";
import NextLink from "next/link";

import { Box, Button, Container, Grid, Heading, HStack, Link, Stack, Text } from "@chakra-ui/react";

import { PageHeader } from "@/components/common/PageHeader";
import type { PriestProfile } from "@/lib/aboutData";
import { priests } from "@/lib/aboutData";
import { siteConfig } from "@/lib/siteConfig";

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

function SectionCard({ title, children, footer }: SectionCardProps) {
  return (
    <Box
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      px={{ base: 5, md: 8 }}
      py={{ base: 6, md: 8 }}
      boxShadow="sm"
      transition="box-shadow 200ms ease, transform 200ms ease"
      _hover={{ boxShadow: "md", transform: "translateY(-1px)" }}
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Heading size={{ base: "lg", md: "xl" }} mb={5}>
        {title}
      </Heading>
      {children}
      {footer ? <Box mt={6}>{footer}</Box> : null}
    </Box>
  );
}

function PriestCard({ priest }: { priest: PriestProfile }) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      p={{ base: 5, md: 6 }}
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    >
      <HStack spacing={5} align="start">
        <Box
          position="relative"
          boxSize={{ base: "88px", md: "104px" }}
          borderRadius="full"
          overflow="hidden"
          borderWidth="3px"
          borderColor="brand.500"
          flexShrink={0}
          _dark={{ borderColor: "brand.300" }}
        >
          {priest.imageSrc ? (
            <Image
              src={priest.imageSrc}
              alt={priest.imageAlt ?? priest.name}
              fill
              sizes="104px"
              style={{ objectFit: "cover" }}
            />
          ) : null}
        </Box>

        <Box flex="1">
          <Heading size="md">{priest.name}</Heading>
          <Text mt={1} fontWeight="semibold" color="brand.700" _dark={{ color: "brand.200" }}>
            {priest.role}
          </Text>
          <Text mt={3} color="gray.700" _dark={{ color: "gray.200" }}>
            {priest.bio}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export function AboutPage() {
  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        title="About Our Parish"
        description={siteConfig.parishNameFull}
        backgroundImageSrc="/img/about/church-building.jpg"
        backgroundImageAlt="Church Building" 
      />

      <Container maxW="6xl" mt={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 8, md: 10 }}>

          <Grid templateColumns={{ base: "1fr", lg: "7fr 5fr" }} gap={{ base: 8, md: 12 }} alignItems="start">
            <Stack spacing={8}>
              <SectionCard
                title="Our History"
                footer={
                  <Box display="flex" justifyContent="flex-end">
                    <Button as={NextLink} href="/about/history" colorScheme="brand">
                      Read More
                    </Button>
                  </Box>
                }
              >
                <Stack spacing={4}>
                  <Text textAlign="justify" lineHeight="tall" color="gray.700" _dark={{ color: "gray.200" }}>
                    From being a part of the Parish of Espiritu Santo, the newborn parish erected on August 28 1951 by
                    His Eminence Manila Archbishop Gabriel Reyes and Fr. Candido Bernal was the first parish priest and
                    was installed by Msgr. Narciso Gatpaydan, Vicar Forane of Espiritu Santo.
                  </Text>
                  <Text textAlign="justify" lineHeight="tall" color="gray.700" _dark={{ color: "gray.200" }}>
                    Fr. Bernal held his first public mass, &apos;Misa pro populo&apos; on October 4 1951 in a chapel that
                    preceded the parish, the Resurreccion chapel. He rent temporarily in a dormitory in Simoun and
                    Crisostomo streets.
                  </Text>
                </Stack>
              </SectionCard>

              <SectionCard title="Our Mission">
                <Text textAlign="justify" lineHeight="tall" color="gray.700" _dark={{ color: "gray.200" }}>
                  The Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro stands in the midst of the
                  City of Manila as a religious sanctuary, inviting devotees and pilgrims from all walks of life to
                  reflection, renewal, and reconciliation. As a house of prayer, the Shrine offers individuals, as well
                  as groups of the faithful, opportunities for the celebration of the faith and an environment conducive
                  to personal example of the Blessed Virgin Mary, recounted in word and art, becomes an important and
                  effective instrument to inspire, encourage and strengthen faith among the faithful.
                </Text>
              </SectionCard>
            </Stack>

            <Stack spacing={8}>
              <SectionCard
                title="Meet Our Priests"
                footer={
                  <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
                    Additional clergy profiles will be added as they become available.
                  </Text>
                }
              >
                <Stack spacing={5}>
                  {priests.map((priest) => (
                    <PriestCard key={priest.id} priest={priest} />
                  ))}
                </Stack>
              </SectionCard>

              <Box position="relative" borderRadius="2xl" overflow="hidden" minH={{ base: 260, md: 320 }}>
                <Image
                  src="/img/about/church-building.jpg"
                  alt="Church Building"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.800, transparent)" />
                <Box position="absolute" left={0} right={0} bottom={0} p={{ base: 5, md: 6 }}>
                  <Heading size="lg" color="white">
                    Our Church Building
                  </Heading>
                  <Text color="whiteAlpha.900">Established 1951</Text>
                  <Link
                    as={NextLink}
                    href="/about/history"
                    display="inline-block"
                    mt={3}
                    fontWeight="semibold"
                    color="white"
                    textDecoration="underline"
                    textUnderlineOffset="4px"
                    _hover={{ color: "white" }}
                  >
                    Explore our history
                  </Link>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
