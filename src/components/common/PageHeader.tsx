import Image from "next/image";

import { Badge, Box, Container, Grid, Heading, Stack, Text, Wrap } from "@chakra-ui/react";

type PageHeaderMetaItem = {
  label: string;
  value: React.ReactNode;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  backgroundImageSrc?: string;
  backgroundImageAlt?: string;
  actions?: React.ReactNode;
  meta?: PageHeaderMetaItem[];
};

export function PageHeader({
  eyebrow,
  title,
  description,
  backgroundImageSrc,
  backgroundImageAlt,
  actions,
  meta,
}: PageHeaderProps) {
  const hasBackground = Boolean(backgroundImageSrc);

  return (
    <Box position="relative" overflow="hidden" borderBottomWidth={hasBackground ? "0" : "1px"}>
      {hasBackground ? (
        <Box position="absolute" inset={0}>
          <Image
            src={backgroundImageSrc!}
            alt={backgroundImageAlt ?? title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <Box position="absolute" inset={0} bgGradient="linear(to-b, blackAlpha.800, blackAlpha.500, transparent)" />
        </Box>
      ) : (
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-br, brand.50, white, white)"
          _dark={{ bgGradient: "linear(to-br, brand.900, gray.900, gray.900)" }}
        />
      )}

      <Container maxW="6xl" position="relative" py={{ base: 14, md: 18 }}>
        <Stack spacing={6}>
          <Stack spacing={5} maxW="3xl">
            {eyebrow ? (
              <Badge alignSelf="flex-start" colorScheme="brand" variant="solid" px={3} py={1} borderRadius="full">
                {eyebrow}
              </Badge>
            ) : null}
            <Heading size={{ base: "xl", md: "2xl" }} color={hasBackground ? "white" : undefined}>
              {title}
            </Heading>
            {description ? (
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={hasBackground ? "whiteAlpha.900" : "gray.600"}
                _dark={hasBackground ? undefined : { color: "gray.300" }}
              >
                {description}
              </Text>
            ) : null}
            {actions ? <Wrap spacing={3}>{actions}</Wrap> : null}
          </Stack>

          {meta?.length ? (
            <Grid templateColumns={{ base: "1fr", md: `repeat(${Math.min(meta.length, 3)}, 1fr)` }} gap={4}>
              {meta.map((item) => (
                <Box
                  key={item.label}
                  bg={hasBackground ? "whiteAlpha.900" : "white"}
                  borderWidth="1px"
                  borderColor={hasBackground ? "whiteAlpha.600" : "gray.200"}
                  borderRadius="2xl"
                  px={{ base: 4, md: 5 }}
                  py={{ base: 4, md: 5 }}
                  _dark={{
                    bg: hasBackground ? "blackAlpha.500" : "gray.800",
                    borderColor: hasBackground ? "whiteAlpha.300" : "gray.700",
                  }}
                  backdropFilter={hasBackground ? "blur(10px)" : undefined}
                >
                  <Text
                    fontSize="sm"
                    color={hasBackground ? "whiteAlpha.800" : "gray.500"}
                    _dark={{ color: hasBackground ? "whiteAlpha.800" : "gray.300" }}
                  >
                    {item.label}
                  </Text>
                  <Box
                    mt={1}
                    color={hasBackground ? "white" : undefined}
                    _dark={hasBackground ? undefined : { color: "gray.100" }}
                  >
                    {item.value}
                  </Box>
                </Box>
              ))}
            </Grid>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}

