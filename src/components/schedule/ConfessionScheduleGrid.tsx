"use client";

import { Box, Grid, Heading, HStack, Tag, TagLabel, Wrap, WrapItem } from "@chakra-ui/react";
import { Clock } from "lucide-react";

import type { DaySchedule } from "@/lib/scheduleData";

type ConfessionScheduleGridProps = {
  schedules: DaySchedule[];
};

export function ConfessionScheduleGrid({ schedules }: ConfessionScheduleGridProps) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
      {schedules.map((schedule) => (
        <Box
          key={schedule.day}
          bg="gray.50"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="xl"
          p={6}
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
        </Box>
      ))}
    </Grid>
  );
}

