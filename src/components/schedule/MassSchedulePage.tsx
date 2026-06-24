"use client";

import NextLink from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import {
  Box,
  Container,
  Divider,
  Grid,
  Heading,
  HStack,
  Link,
  Stack,
  Tab,
  TabList,
  Tabs,
  Tag,
  TagLabel,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Church, HandHeart, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { ConfessionScheduleGrid } from "@/components/schedule/ConfessionScheduleGrid";
import { MassScheduleGrid } from "@/components/schedule/MassScheduleGrid";
import { OtherServicesList } from "@/components/schedule/OtherServicesList";
import { ScheduleBanner } from "@/components/schedule/ScheduleBanner";
import type { DaySchedule } from "@/lib/scheduleData";
import { confessionSchedules, massSchedules, otherServices, scheduleBanners } from "@/lib/scheduleData";
import { siteConfig } from "@/lib/siteConfig";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

function isFirstSaturday(date: Date) {
  return date.getDay() === 6 && date.getDate() <= 7;
}

function getTodayMassSchedule(date: Date): DaySchedule | undefined {
  const dayName = dayNames[date.getDay()];
  const key =
    dayName === "Sunday"
      ? "Sunday"
      : dayName === "Wednesday"
        ? "Wednesday"
        : isFirstSaturday(date)
          ? "First Saturday"
          : "Ordinary Weekday";

  return massSchedules.find((s) => s.day === key);
}

function getTodayConfessionSchedule(date: Date): DaySchedule | undefined {
  const dayName = dayNames[date.getDay()];
  return confessionSchedules.find((s) => s.day === dayName);
}

type TodayCalloutProps = {
  title: string;
  schedule?: DaySchedule;
  emptyText: string;
};

function TodayCallout({ title, schedule, emptyText }: TodayCalloutProps) {
  return (
    <Box
      bg="brand.50"
      borderWidth="1px"
      borderColor="brand.100"
      borderRadius="xl"
      px={{ base: 4, md: 6 }}
      py={{ base: 4, md: 5 }}
      _dark={{ bg: "brand.900", borderColor: "brand.800" }}
    >
      <HStack justify="space-between" align="start" spacing={4} flexWrap="wrap">
        <Box>
          <Heading size="sm">{title}</Heading>
          <Text fontSize="sm" color="gray.700" _dark={{ color: "gray.200" }}>
            Times shown are local ({Intl.DateTimeFormat().resolvedOptions().timeZone})
          </Text>
        </Box>
        {schedule ? (
          <Wrap spacing={2} justify="flex-end">
            {schedule.times.map((t) => (
              <WrapItem key={t}>
                <Tag size="md" variant="solid" colorScheme="brand">
                  <TagLabel>{t}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Text fontSize="sm" color="gray.700" _dark={{ color: "gray.200" }}>
            {emptyText}
          </Text>
        )}
      </HStack>
    </Box>
  );
}

export function MassSchedulePage() {
  const now = new Date();
  const todayName = dayNames[now.getDay()];
  const todayMass = getTodayMassSchedule(now);
  const todayConfession = getTodayConfessionSchedule(now);
  const [tabIndex, setTabIndex] = useState(0);

  const panel = useMemo(() => {
    if (tabIndex === 0) {
      return {
        key: "mass",
        content: (
          <Grid templateColumns={{ base: "1fr", lg: "360px 1fr" }} gap={6} alignItems="start">
            <Box position={{ base: "relative", lg: "sticky" }} top={{ lg: "96px" }}>
              <ScheduleBanner src={scheduleBanners.mass.image} alt={scheduleBanners.mass.alt} />
            </Box>
            <Stack spacing={6}>
              <TodayCallout
                title={`Today (${todayName}) — Mass`}
                schedule={todayMass}
                emptyText="No posted mass schedule for today."
              />
              <Divider />
              <MassScheduleGrid schedules={massSchedules} />
            </Stack>
          </Grid>
        ),
      };
    }

    if (tabIndex === 1) {
      return {
        key: "confession",
        content: (
          <Grid templateColumns={{ base: "1fr", lg: "360px 1fr" }} gap={6} alignItems="start">
            <Box position={{ base: "relative", lg: "sticky" }} top={{ lg: "96px" }}>
              <ScheduleBanner src={scheduleBanners.confession.image} alt={scheduleBanners.confession.alt} />
            </Box>
            <Stack spacing={6}>
              <TodayCallout
                title={`Today (${todayName}) — Confession`}
                schedule={todayConfession}
                emptyText="No scheduled confessions today."
              />
              <Divider />
              <ConfessionScheduleGrid schedules={confessionSchedules} />
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
                Confession is typically available before the evening mass. Please arrive early.
              </Text>
            </Stack>
          </Grid>
        ),
      };
    }

    return {
      key: "other",
      content: (
        <Stack spacing={5}>
          <Box
            bg="gray.50"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="xl"
            px={{ base: 4, md: 6 }}
            py={{ base: 4, md: 5 }}
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          >
            <Heading size="sm" mb={1}>
              Devotions and Parish Prayer Life
            </Heading>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
              Regular devotions and community prayers held throughout the week.
            </Text>
          </Box>
          <OtherServicesList services={otherServices} />
        </Stack>
      ),
    };
  }, [tabIndex, todayConfession, todayMass, todayName]);

  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        title="Schedule of Services"
        description={
          <>
            Updated mass, confession, and devotion schedules for {siteConfig.parishNameFull}. For feast days and
            special liturgies, please check announcements or contact the parish office at{" "}
            <Link as={NextLink} href={`tel:${siteConfig.contact.phone}`} color="brand.600" _dark={{ color: "brand.200" }}>
              {siteConfig.contact.phone}
            </Link>
            .
          </>
        }
        backgroundImageSrc="/img/about/church-building.jpg"
        backgroundImageAlt="Schedule"
      />

      <Container maxW="6xl" mt={{ base: 8, md: 10 }}>
        <Tabs variant="soft-rounded" colorScheme="brand" isFitted index={tabIndex} onChange={setTabIndex}>
          <TabList mb={6}>
            <Tab>
              <HStack spacing={2}>
                <Church size={18} />
                <Text>Mass</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <HandHeart size={18} />
                <Text>Confession</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Sparkles size={18} />
                <Text>Other</Text>
              </HStack>
            </Tab>
          </TabList>
        </Tabs>

        <Box mt={2}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={panel.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
            >
              {panel.content}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
}
