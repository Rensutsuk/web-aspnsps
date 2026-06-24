"use client";

import Image from "next/image";
import NextLink from "next/link";

import { Badge, Box, Button, Heading, HStack, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import { CalendarClock, FileText, MapPin } from "lucide-react";

import type { EventSummary } from "@/features/events/types";
import { formatEventDateTime } from "@/features/events/utils";

type EventCardProps = {
  event: EventSummary;
  compact?: boolean;
};

export function EventCard({ event, compact = false }: EventCardProps) {
  const hasCover = Boolean(event.coverImage);
  const titleSize = compact ? "md" : "lg";

  return (
    <LinkBox
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
      transition="transform 0.15s ease, box-shadow 0.15s ease"
      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
    >
      {hasCover ? (
        <Box position="relative" width="100%" height={compact ? "160px" : "200px"}>
          <Image src={event.coverImage ?? ""} alt={event.title} fill style={{ objectFit: "cover" }} />
        </Box>
      ) : null}

      <Stack spacing={3} p={{ base: 5, md: 6 }}>
        <Stack spacing={1}>
          <HStack spacing={2} color="gray.600" _dark={{ color: "gray.300" }} fontSize="sm">
            <CalendarClock size={16} />
            <Text>{formatEventDateTime(event.startAt)}</Text>
          </HStack>
          <Heading size={titleSize} lineHeight="short">
            <LinkOverlay as={NextLink} href={`/events/${event.slug}`}>
              {event.title}
            </LinkOverlay>
          </Heading>
        </Stack>

        {event.location ? (
          <HStack spacing={2} color="gray.600" _dark={{ color: "gray.300" }} fontSize="sm">
            <MapPin size={16} />
            <Text noOfLines={1}>{event.location}</Text>
          </HStack>
        ) : null}

        <Text color="gray.700" _dark={{ color: "gray.200" }} noOfLines={compact ? 3 : 4}>
          {event.description}
        </Text>

        <HStack spacing={3} flexWrap="wrap">
          <Button as={NextLink} href={`/events/${event.slug}`} size="sm" colorScheme="brand">
            View details
          </Button>
          <Button as={NextLink} href={`/events/${event.slug}/ics`} size="sm" variant="outline" colorScheme="brand">
            Add to calendar
          </Button>
          {event.blogPostSlug ? (
            <Badge colorScheme="purple" variant="subtle" display="inline-flex" alignItems="center" gap={1} px={3} py={1} borderRadius="full">
              <FileText size={14} />
              Linked post
            </Badge>
          ) : null}
        </HStack>
      </Stack>
    </LinkBox>
  );
}
