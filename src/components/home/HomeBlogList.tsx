"use client";

import NextLink from "next/link";

import { Box, Button, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPostSummary } from "@/features/blog/types";

type HomeBlogListProps = {
  posts: BlogPostSummary[];
};

export function HomeBlogList({ posts }: HomeBlogListProps) {
  return (
    <Box minH="calc(100dvh - 64px)" display="flex" alignItems="center" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Container maxW="6xl" py={{ base: 10, md: 16 }}>
        <Stack spacing={8}>
          <Stack spacing={2} textAlign="center">
            <Heading size={{ base: "lg", md: "xl" }}>Latest Announcements</Heading>
            <Text opacity={0.8}>
              Fresh parish updates now come directly from the published blog posts.
            </Text>
          </Stack>

          {posts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} compact />
              ))}
            </SimpleGrid>
          ) : (
            <Box borderWidth="1px" borderStyle="dashed" borderRadius="2xl" p={8} textAlign="center" bg="white" _dark={{ bg: "gray.900" }}>
              <Heading size="md">No published posts yet</Heading>
              <Text mt={2} opacity={0.85}>
                Once announcements are published, they will appear here automatically.
              </Text>
            </Box>
          )}

          <Button as={NextLink} href="/blog" alignSelf="center" colorScheme="brand" size="lg">
            Browse all blog posts
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
