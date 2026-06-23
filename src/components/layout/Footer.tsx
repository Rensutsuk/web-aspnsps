"use client";

import NextLink from "next/link";

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Cross, Facebook, Instagram, Mail, Music2, Phone } from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <Box
      as="footer"
      bg="gray.50"
      color="gray.700"
      borderTopWidth="1px"
      borderColor="gray.200"
      _dark={{ bg: "gray.900", color: "gray.100", borderColor: "gray.800" }}
      px={0}
      py={6}
      w="full"
    >
      <Container maxW="6xl">
        <Grid
          templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1.2fr 1fr 1fr 1fr" }}
          gap={6}
          alignItems="start"
        >
          <GridItem>
            <HStack spacing={3}>
              <Cross size={24} />
              <Text>
                {siteConfig.parishNameShort}
                <br />
                Serving the community since 1992
              </Text>
            </HStack>
          </GridItem>

          <GridItem>
            <Heading size="xs" textTransform="uppercase" letterSpacing="wider" mb={2} opacity={0.8}>
              Contact
            </Heading>
            <Stack spacing={2}>
              <Link href={`tel:${siteConfig.contact.phone}`} _hover={{ color: "brand.600" }} _dark={{ _hover: { color: "brand.300" } }}>
                <HStack spacing={2}>
                  <Phone size={16} />
                  <Text as="span">{siteConfig.contact.phone}</Text>
                </HStack>
              </Link>
              <Link href={`mailto:${siteConfig.contact.email}`} _hover={{ color: "brand.600" }} _dark={{ _hover: { color: "brand.300" } }}>
                <HStack spacing={2}>
                  <Mail size={16} />
                  <Text as="span">{siteConfig.contact.email}</Text>
                </HStack>
              </Link>
            </Stack>
          </GridItem>

          <GridItem>
            <Heading size="xs" textTransform="uppercase" letterSpacing="wider" mb={2} opacity={0.8}>
              Donate
            </Heading>
            <Link as={NextLink} href="/donate" _hover={{ color: "brand.600" }} _dark={{ _hover: { color: "brand.300" } }}>
              Support Our Parish
            </Link>
          </GridItem>

          <GridItem>
            <Heading size="xs" textTransform="uppercase" letterSpacing="wider" mb={2} opacity={0.8}>
              Social
            </Heading>
            <HStack spacing={4}>
              <Link href={siteConfig.links.facebook} aria-label="Facebook" _hover={{ color: "brand.600" }} _dark={{ _hover: { color: "brand.300" } }}>
                <Facebook size={22} />
              </Link>
              <Link
                href={siteConfig.links.instagram}
                aria-label="Instagram"
                _hover={{ color: "pink.500" }}
                _dark={{ _hover: { color: "pink.300" } }}
              >
                <Instagram size={22} />
              </Link>
              <Link href={siteConfig.links.tiktok} aria-label="TikTok" _hover={{ color: "purple.600" }} _dark={{ _hover: { color: "purple.300" } }}>
                <Music2 size={22} />
              </Link>
            </HStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
