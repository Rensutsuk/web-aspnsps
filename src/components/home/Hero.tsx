import Image from "next/image";

import { Box, Container, Heading, Text } from "@chakra-ui/react";

export function Hero() {
  return (
    <Box
      position="relative"
      minH="calc(100dvh - 64px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box position="absolute" inset={0}>
        <Image
          src="/img/home/hero.jpg"
          alt="Church"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, white, rgba(255,255,255,0.45), transparent)"
          _dark={{
            bgGradient: "linear(to-t, gray.900, rgba(17,24,39,0.55), transparent)",
          }}
        />
      </Box>

      <Container maxW="6xl" position="relative">
        <Box transform="translateY(160px)" textAlign="center" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "lg", md: "2xl" }} mb={{ base: 2, md: 4 }}>
            Mary: A Haven of Hope for Families
          </Heading>
          <Text fontSize={{ base: "lg", md: "2xl" }} opacity={0.85}>
            Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

