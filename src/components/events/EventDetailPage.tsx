"use client";

import Image from "next/image";
import NextLink from "next/link";

import { Badge, Box, Button, Container, Divider, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { CalendarClock, FileText, MapPin } from "lucide-react";

import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { PageHeader } from "@/components/common/PageHeader";
import type { EventDetail } from "@/features/events/types";
import { formatEventDateTime } from "@/features/events/utils";

type EventDetailPageProps = {
  event: EventDetail;
};

export function EventDetailPage({ event }: EventDetailPageProps) {
  const timeRange = event.endAt
    ? `${formatEventDateTime(event.startAt)} – ${formatEventDateTime(event.endAt, { includeWeekday: false })}`
    : formatEventDateTime(event.startAt);

  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        eyebrow="Parish Event"
        title={event.title}
        description={event.location ? `${timeRange} • ${event.location}` : timeRange}
        backgroundImageSrc={event.coverImage ?? "/img/home/hero.jpg"}
        backgroundImageAlt={event.title}
        actions={
          <>
            <Button as={NextLink} href="/events" colorScheme="brand">
              Back to Events
            </Button>
            <Button as={NextLink} href={`/events/${event.slug}/ics`} variant="outline" color="white" borderColor="whiteAlpha.700" _hover={{ bg: "whiteAlpha.200" }}>
              Add to calendar
            </Button>
          </>
        }
        meta={[
          { label: "Export", value: ".ics" },
          { label: "Calendar", value: "Subscribe /events.ics" },
          { label: "Optional", value: "Linked blog post" },
        ]}
      />

      <Container maxW="4xl" mt={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 6, md: 8 }}>
          <Box borderWidth="1px" borderRadius="3xl" overflow="hidden" bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
            {event.coverImage ? (
              <Box position="relative" width="100%" height={{ base: "220px", md: "320px" }}>
                <Image src={event.coverImage} alt={event.title} fill style={{ objectFit: "cover" }} />
              </Box>
            ) : null}

            <Stack spacing={4} p={{ base: 5, md: 7 }}>
              <Stack spacing={2}>
                <HStack spacing={2} color="gray.600" _dark={{ color: "gray.300" }}>
                  <CalendarClock size={18} />
                  <Text fontWeight="semibold">{timeRange}</Text>
                </HStack>
                {event.location ? (
                  <HStack spacing={2} color="gray.600" _dark={{ color: "gray.300" }}>
                    <MapPin size={18} />
                    <Text>{event.location}</Text>
                  </HStack>
                ) : null}
              </Stack>

              <Divider />

              <BlogMarkdown content={event.description} />

              {event.blogPostSlug ? (
                <>
                  <Divider />
                  <Stack spacing={2}>
                    <HStack spacing={2}>
                      <Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full" display="inline-flex" alignItems="center" gap={1}>
                        <FileText size={14} />
                        Linked blog post
                      </Badge>
                    </HStack>
                    <Text color="gray.600" _dark={{ color: "gray.300" }}>
                      {event.blogPostTitle ? `Read more: ${event.blogPostTitle}` : "This event has an associated blog post."}
                    </Text>
                    <Link as={NextLink} href={`/blog/${event.blogPostSlug}`} color="brand.600" _dark={{ color: "brand.300" }} fontWeight="semibold">
                      Open blog post
                    </Link>
                  </Stack>
                </>
              ) : null}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
