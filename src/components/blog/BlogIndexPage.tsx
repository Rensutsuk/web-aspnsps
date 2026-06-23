"use client";

import NextLink from "next/link";

import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Search } from "lucide-react";

import { BlogCard } from "@/components/blog/BlogCard";
import { PageHeader } from "@/components/common/PageHeader";
import type { BlogIndexData } from "@/features/blog/types";

type BlogIndexPageProps = {
  data: BlogIndexData;
};

export function BlogIndexPage({ data }: BlogIndexPageProps) {
  const { filters, posts, totalPosts } = data;
  const hasActiveFilters = Boolean(filters.query);

  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        eyebrow="Parish Blog"
        title="Latest Announcements And Reflections"
        description="Read parish updates, ministry highlights, and pastoral reflections published in markdown and organized for easy browsing."
        backgroundImageSrc="/img/home/hero.jpg"
        backgroundImageAlt="Parish blog"
        actions={
          <>
            <Button as={NextLink} href="/" colorScheme="brand">
              Back to Home
            </Button>
            <Button as={NextLink} href={hasActiveFilters ? "/blog" : "/contact"} variant="outline" color="white" borderColor="whiteAlpha.700" _hover={{ bg: "whiteAlpha.200" }}>
              {hasActiveFilters ? "Clear filters" : "Contact the Parish"}
            </Button>
          </>
        }
        meta={[
          { label: "Published Posts", value: `${totalPosts}` },
          { label: "Browse", value: "Searchable archive" },
          { label: "Format", value: "Markdown articles" },
        ]}
      />

      <Container maxW="6xl" mt={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 8, md: 10 }}>
          <Box
            as="form"
            action="/blog"
            method="get"
            bg="gray.50"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="2xl"
            p={{ base: 5, md: 6 }}
            _dark={{ bg: "gray.900", borderColor: "gray.700" }}
          >
            <Stack spacing={5}>
              <Grid templateColumns={{ base: "1fr", lg: "1.5fr auto" }} gap={4} alignItems="center">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Search size={18} />
                  </InputLeftElement>
                  <Input
                    name="q"
                    defaultValue={filters.query}
                    placeholder="Search blog posts, authors, categories, or tags..."
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                  />
                </InputGroup>

                <HStack spacing={3} justify={{ base: "flex-start", lg: "flex-end" }}>
                  <Button type="submit" colorScheme="brand">
                    Search
                  </Button>
                  {hasActiveFilters ? (
                    <Button as={NextLink} href="/blog" variant="ghost">
                      Reset
                    </Button>
                  ) : null}
                </HStack>
              </Grid>
              <Wrap spacing={2}>
                <WrapItem>
                  <Button as={NextLink} href="/blog" size="sm" variant={hasActiveFilters ? "outline" : "solid"} colorScheme="brand">
                    All posts ({totalPosts})
                  </Button>
                </WrapItem>
                {filters.query ? (
                  <WrapItem>
                    <Badge px={3} py={1} borderRadius="full" colorScheme="brand" variant="subtle">
                      Query: {filters.query}
                    </Badge>
                  </WrapItem>
                ) : null}
              </Wrap>
            </Stack>
          </Box>

          <Stack spacing={3}>
            <Heading size="lg">
              {hasActiveFilters ? `${posts.length} result(s) found` : "Recent posts"}
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              {hasActiveFilters
                ? "Your search is applied across titles, excerpts, authors, and article content."
                : "Browse the latest announcements and open a post to read the full markdown article."}
            </Text>
          </Stack>

          {posts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
              {posts.map((post, index) => (
                <BlogCard key={post.slug} post={post} compact={index > 0} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="gray.300"
              borderRadius="2xl"
              p={{ base: 8, md: 10 }}
              textAlign="center"
            >
              <Heading size="md">No posts matched your filters</Heading>
              <Text mt={3} color="gray.600" _dark={{ color: "gray.300" }}>
                Try a broader keyword or clear the active search.
              </Text>
              <Button as={NextLink} href="/blog" mt={5} colorScheme="brand" variant="outline">
                View all posts
              </Button>
            </Box>
          )}

          <Box
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="2xl"
            p={{ base: 5, md: 6 }}
            bg="white"
            _dark={{ bg: "gray.900", borderColor: "gray.700" }}
          >
            <Stack spacing={2}>
              <Heading size="md">Need a specific parish update?</Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                If you cannot find the announcement you need, please reach out through the parish contact page.
              </Text>
              <Link as={NextLink} href="/contact" color="brand.600" _dark={{ color: "brand.300" }} fontWeight="semibold">
                Go to contact page
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
