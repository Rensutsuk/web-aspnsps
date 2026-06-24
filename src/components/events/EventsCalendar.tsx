"use client";

import NextLink from "next/link";
import { useMemo } from "react";

import { Badge, Box, Button, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import type { EventSummary } from "@/features/events/types";
import { formatEventDayKey, startOfMonth } from "@/features/events/utils";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type EventsCalendarProps = {
  month: Date;
  events: EventSummary[];
  onChangeMonth: (month: Date) => void;
};

function buildMonthGrid(month: Date) {
  const start = startOfMonth(month);
  const gridStart = new Date(start);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const days: Date[] = [];
  for (let index = 0; index < 42; index += 1) {
    const next = new Date(gridStart);
    next.setDate(gridStart.getDate() + index);
    days.push(next);
  }

  return { start, days };
}

export function EventsCalendar({ month, events, onChangeMonth }: EventsCalendarProps) {
  const { start, days } = useMemo(() => buildMonthGrid(month), [month]);

  const eventsByDay = useMemo(() => {
    const bucket: Record<string, EventSummary[]> = {};
    for (const event of events) {
      const key = formatEventDayKey(event.startAt);
      bucket[key] = bucket[key] ? [...bucket[key], event] : [event];
    }
    for (const key of Object.keys(bucket)) {
      bucket[key] = bucket[key].slice().sort((left, right) => left.startAt.localeCompare(right.startAt));
    }
    return bucket;
  }, [events]);

  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(start);

  return (
    <Stack spacing={4}>
      <HStack justify="space-between" flexWrap="wrap" gap={3}>
        <Stack spacing={0}>
          <Heading size="md">Calendar</Heading>
          <Text color="gray.600" _dark={{ color: "gray.300" }}>
            {monthLabel}
          </Text>
        </Stack>

        <HStack spacing={2} flexWrap="wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const next = new Date(start);
              next.setMonth(next.getMonth() - 1);
              onChangeMonth(next);
            }}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const next = new Date(start);
              next.setMonth(next.getMonth() + 1);
              onChangeMonth(next);
            }}
          >
            Next
          </Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={7} spacing={2}>
        {dayLabels.map((label) => (
          <Box key={label} textAlign="center" fontSize="sm" fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
            {label}
          </Box>
        ))}

        {days.map((day) => {
          const key = formatEventDayKey(day.toISOString());
          const dayEvents = eventsByDay[key] ?? [];
          const isOutside = day.getMonth() !== start.getMonth();
          const isToday = key === formatEventDayKey(new Date().toISOString());

          return (
            <Box
              key={key}
              borderWidth="1px"
              borderColor={isToday ? "brand.400" : "gray.200"}
              borderRadius="xl"
              p={3}
              minH="96px"
              bg={isOutside ? "gray.50" : "white"}
              _dark={{ bg: isOutside ? "gray.800" : "gray.900", borderColor: isToday ? "brand.300" : "gray.700" }}
              opacity={isOutside ? 0.6 : 1}
            >
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="semibold" fontSize="sm">
                  {day.getDate()}
                </Text>
                {dayEvents.length > 0 ? (
                  <Badge colorScheme="brand" variant="subtle" borderRadius="full">
                    {dayEvents.length}
                  </Badge>
                ) : null}
              </HStack>

              <Stack spacing={1}>
                {dayEvents.slice(0, 2).map((event) => (
                  <Button
                    key={event.slug}
                    as={NextLink}
                    href={`/events/${event.slug}`}
                    size="xs"
                    variant="ghost"
                    justifyContent="flex-start"
                    whiteSpace="normal"
                    textAlign="left"
                    height="auto"
                    py={1}
                    px={2}
                  >
                    <Text noOfLines={1}>{event.title}</Text>
                  </Button>
                ))}
                {dayEvents.length > 2 ? (
                  <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }}>
                    +{dayEvents.length - 2} more
                  </Text>
                ) : null}
              </Stack>
            </Box>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
