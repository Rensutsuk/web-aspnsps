"use client";

import { Box, Grid, Heading, HStack, Tag, TagLabel, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Clock } from "lucide-react";

import type { DaySchedule } from "@/lib/scheduleData";

type MassScheduleGridProps = {
  schedules: DaySchedule[];
};

export function MassScheduleGrid({ schedules }: MassScheduleGridProps) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
      {schedules.map((schedule) => (
        <Box
          key={schedule.day}
          bg="gray.50"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="xl"
          p={6}
          gridColumn={schedule.day === "Sunday" ? { base: "auto", lg: "span 3" } : undefined}
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Heading size="md" mb={3}>
            {schedule.day}
          </Heading>
          <Wrap spacing={2}>
            {schedule.times.map((time) => (
              <WrapItem key={time}>
                <Tag size="lg" variant="subtle" colorScheme="brand">
                  <HStack spacing={2}>
                    <Clock size={16} />
                    <TagLabel>{time}</TagLabel>
                  </HStack>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
          {schedule.day === "Sunday" ? (
            <Text mt={4} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
              Sundays tend to be busy. Please arrive early to find seating.
            </Text>
          ) : null}
        </Box>
      ))}
    </Grid>
  );
}

