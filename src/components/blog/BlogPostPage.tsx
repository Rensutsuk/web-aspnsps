"use client";

import Image from "next/image";
import NextLink from "next/link";

import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { BlogCard } from "@/components/blog/BlogCard";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import type { BlogPostDetail } from "@/features/blog/types";
import { formatBlogDate } from "@/features/blog/utils";

type BlogPostPageProps = {
  post: BlogPostDetail;
};

export function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <Box pb={{ base: 10, md: 12 }}>
      <Box borderBottomWidth="1px" borderColor="gray.200" _dark={{ borderColor: "gray.800" }}>
        <Container maxW="5xl" py={{ base: 10, md: 14 }}>
          <Stack spacing={6}>
            <HStack spacing={3} flexWrap="wrap">
              <Button as={NextLink} href="/blog" size="sm" variant="ghost">
                Back to blog
              </Button>
              <Badge colorScheme="brand" variant="solid">
                Parish Blog
              </Badge>
              <Badge variant="outline">{post.readingTimeMinutes} min read</Badge>
            </HStack>

            <Stack spacing={4}>
              <Heading size={{ base: "xl", md: "2xl" }}>{post.title}</Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" _dark={{ color: "gray.300" }}>
                {post.excerpt}
              </Text>
            </Stack>

            <Wrap spacing={3} color="gray.500" _dark={{ color: "gray.400" }}>
              <WrapItem>{formatBlogDate(post.date)}</WrapItem>
              <WrapItem>{post.author}</WrapItem>
            </Wrap>
          </Stack>
        </Container>
      </Box>

      <Container maxW="5xl" mt={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 8, md: 10 }}>
          {post.featuredImage ? (
            <Box position="relative" minH={{ base: "240px", md: "420px" }} borderRadius="3xl" overflow="hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 960px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ) : null}

          <Box
            as="article"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="3xl"
            bg="white"
            px={{ base: 5, md: 8 }}
            py={{ base: 6, md: 8 }}
            _dark={{ bg: "gray.900", borderColor: "gray.700" }}
          >
            <BlogMarkdown content={post.content} />
          </Box>

          {post.relatedPosts.length > 0 ? (
            <Box>
              <Stack spacing={2} mb={6}>
                <Heading size="lg">Related posts</Heading>
                <Text color="gray.600" _dark={{ color: "gray.300" }}>
                  Continue with announcements and reflections connected by topic.
                </Text>
              </Stack>

              <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
                {post.relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} compact />
                ))}
              </SimpleGrid>
            </Box>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
