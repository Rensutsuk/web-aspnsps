"use client";

import Image from "next/image";
import NextLink from "next/link";

import { Badge, Box, Button, Heading, HStack, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";

import type { BlogPostSummary } from "@/features/blog/types";
import { formatBlogDate } from "@/features/blog/utils";

type BlogCardProps = {
  post: BlogPostSummary;
  compact?: boolean;
};

export function BlogCard({ post, compact = false }: BlogCardProps) {
  return (
    <LinkBox
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
    >
      <Box position="relative" minH={compact ? "200px" : "240px"} bg="gray.100" _dark={{ bg: "gray.800" }}>
        <Image
          src={post.featuredImage || "/img/home/hero.jpg"}
          alt={post.title}
          fill
          sizes={compact ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Stack spacing={4} p={{ base: 5, md: 6 }}>
        <Stack spacing={3}>
          <HStack spacing={2} flexWrap="wrap">
            <Badge colorScheme="brand" variant="subtle">
              Parish Blog
            </Badge>
            <Badge variant="outline">{post.readingTimeMinutes} min read</Badge>
          </HStack>

          <Heading size={compact ? "md" : "lg"} lineHeight="short">
            <LinkOverlay as={NextLink} href={`/blog/${post.slug}`}>
              {post.title}
            </LinkOverlay>
          </Heading>

          <Text color="gray.600" _dark={{ color: "gray.300" }}>
            {post.excerpt}
          </Text>
        </Stack>

        <Stack spacing={3} pt={1}>
          <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
            {formatBlogDate(post.date)} · {post.author}
          </Text>

          <Button as={NextLink} href={`/blog/${post.slug}`} alignSelf="flex-start" colorScheme="brand" variant="outline">
            Read article
          </Button>
        </Stack>
      </Stack>
    </LinkBox>
  );
}
