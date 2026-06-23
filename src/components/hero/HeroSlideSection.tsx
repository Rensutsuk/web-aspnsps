import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";

type HeroSlideSectionProps = {
  title: string;
  subtitle: string;
  accent?: string;
};

export function HeroSlideSection({ title, subtitle, accent }: HeroSlideSectionProps) {
  return (
    <Box
      minH="100%"
      scrollSnapAlign="start"
      borderBottomWidth="1px"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        bgGradient={
          accent
            ? `radial(600px circle at 20% 20%, ${accent}, transparent 60%), linear(to-b, transparent, rgba(0,0,0,0.02))`
            : "radial(600px circle at 20% 20%, rgba(14,165,233,0.18), transparent 60%), linear(to-b, transparent, rgba(0,0,0,0.02))"
        }
        _dark={{
          bgGradient: accent
            ? `radial(600px circle at 20% 20%, ${accent}, transparent 60%), linear(to-b, rgba(0,0,0,0.2), rgba(0,0,0,0.6))`
            : "radial(600px circle at 20% 20%, rgba(14,165,233,0.24), transparent 60%), linear(to-b, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
        }}
      />

      <Container maxW="6xl" py={{ base: 12, md: 20 }} position="relative">
        <Stack spacing={4} maxW="3xl">
          <Heading size={{ base: "lg", md: "2xl" }}>{title}</Heading>
          <Text fontSize={{ base: "md", md: "lg" }} opacity={0.9}>
            {subtitle}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

