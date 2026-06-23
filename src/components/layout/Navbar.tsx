"use client";

import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
} from "@chakra-ui/react";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { siteConfig } from "@/lib/siteConfig";

type HamburgerIconProps = {
  isOpen: boolean;
};

function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  return (
    <Icon viewBox="0 0 24 24" boxSize={5} fill="none" stroke="currentColor">
      <path
        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Icon>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg="brand.600"
      color="white"
    >
      <Container maxW="6xl" h="64px">
        <Flex align="center" justify="space-between" h="64px">
          <Flex align="center" gap={3}>
            <Box pl={2} py={1}>
              <Image src="/logo.png" alt="ASPNSPS Logo" width={35} height={35} />
            </Box>
            <Link as={NextLink} href="/" fontWeight="bold" fontSize="xl">
              {siteConfig.parishNameShort}
            </Link>
          </Flex>

          <HStack spacing={4} as="nav" aria-label="Primary" display={{ base: "none", lg: "flex" }}>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                as={NextLink}
                href={item.href}
                fontWeight={isActive(item.href) ? "bold" : "medium"}
                opacity={isActive(item.href) ? 1 : 0.9}
                position="relative"
                _after={
                  isActive(item.href)
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: "-10px",
                        height: "2px",
                        bg: "white",
                        borderRadius: "full",
                      }
                    : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </HStack>

          <Box flex="1" />
          <ThemeToggleButton />
          <IconButton
            aria-label="Open menu"
            display={{ base: "inline-flex", lg: "none" }}
            variant="ghost"
            icon={<HamburgerIcon isOpen={isMenuOpen} />}
            onClick={() => setIsMenuOpen((v) => !v)}
          />
        </Flex>
      </Container>

      <Box
        display={{ base: "block", lg: "none" }}
        position="fixed"
        inset={0}
        bg="brand.600"
        transform={isMenuOpen ? "translateX(0)" : "translateX(100%)"}
        transition="transform 0.3s ease-in-out"
        zIndex={40}
        pt="80px"
      >
        <Container maxW="6xl">
          <Stack spacing={2} as="nav" aria-label="Mobile">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                as={NextLink}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                fontSize="2xl"
                py={4}
                textAlign="center"
                fontWeight={isActive(item.href) ? "bold" : "medium"}
                bg={isActive(item.href) ? "brand.700" : "transparent"}
                _hover={{ bg: "brand.700" }}
                borderRadius="md"
              >
                {item.label}
              </Link>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
