"use client";

import NextLink from "next/link";
import { useMemo, useState } from "react";

import { Box, Button, Container, Heading, HStack, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { EventCard } from "@/components/events/EventCard";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { PageHeader } from "@/components/common/PageHeader";
import type { EventsIndexData } from "@/features/events/types";
import { startOfMonth } from "@/features/events/utils";

type EventsIndexPageProps = {
  data: EventsIndexData;
};

export function EventsIndexPage({ data }: EventsIndexPageProps) {
  const { events } = data;
  const [month, setMonth] = useState(() => startOfMonth(new Date()));

  const upcomingEvents = useMemo(() => {
    const nowIso = new Date().toISOString();
    return events
      .slice()
      .filter((event) => event.endAt ? event.endAt >= nowIso : event.startAt >= nowIso)
      .slice(0, 12);
  }, [events]);

  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        eyebrow="Parish Events"
        title="Calendar And Upcoming Activities"
        description="Browse upcoming parish activities in a calendar view, open an event for details, and download iCal files to add to your personal calendar."
        backgroundImageSrc="/img/home/hero.jpg"
        backgroundImageAlt="Parish events"
        actions={
          <>
            <Button as={NextLink} href="/events.ics" colorScheme="brand">
              Subscribe (iCal)
            </Button>
            <Button
              as={NextLink}
              href="/contact"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.700"
              _hover={{ bg: "whiteAlpha.200" }}
            >
              Contact the Parish
            </Button>
          </>
        }
        meta={[
          { label: "Upcoming", value: `${upcomingEvents.length}` },
          { label: "Export", value: "iCal feed" },
          { label: "Details", value: "Per-event pages" },
        ]}
      />

      <Container maxW="6xl" mt={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 8, md: 10 }}>
          <Box
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="2xl"
            p={{ base: 5, md: 6 }}
            bg="white"
            _dark={{ bg: "gray.900", borderColor: "gray.700" }}
          >
            <EventsCalendar month={month} events={events} onChangeMonth={setMonth} />
            <Text mt={4} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
              Subscribe once using the iCal feed to keep your calendar up to date:
              {" "}
              <Link as={NextLink} href="/events.ics" color="brand.600" _dark={{ color: "brand.300" }} fontWeight="semibold">
                /events.ics
              </Link>
            </Text>
          </Box>

          <Stack spacing={3}>
            <HStack justify="space-between" flexWrap="wrap" gap={3}>
              <Stack spacing={1}>
                <Heading size="lg">Upcoming events</Heading>
                <Text color="gray.600" _dark={{ color: "gray.300" }}>
                  Open an event for the full description and optional linked blog post.
                </Text>
              </Stack>
            </HStack>
          </Stack>

          {upcomingEvents.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.slug} event={event} compact={index > 0} />
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
              <Heading size="md">No upcoming events yet</Heading>
              <Text mt={3} color="gray.600" _dark={{ color: "gray.300" }}>
                Check back soon or contact the parish for the latest announcements.
              </Text>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
