"use client";

import Image from "next/image";

import { Box, Heading, HStack, SimpleGrid, Stack, Tag, TagLabel, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Church, Clock, Heart, Sunrise } from "lucide-react";

import type { OtherService } from "@/lib/scheduleData";

type OtherServicesListProps = {
  services: OtherService[];
};

function getServiceIcon(title: string) {
  if (title.toLowerCase().includes("rosary")) return <Church size={22} />;
  if (title.toLowerCase().includes("holy hour")) return <Clock size={22} />;
  if (title.toLowerCase().includes("morning") || title.toLowerCase().includes("evening")) return <Sunrise size={22} />;
  return <Heart size={22} />;
}

export function OtherServicesList({ services }: OtherServicesListProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {services.map((service) => (
        <Box
          key={service.title}
          bg="gray.50"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="xl"
          overflow="hidden"
          transition="transform 150ms ease, box-shadow 150ms ease"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Box position="relative" w="full" minH={170}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              style={{ objectFit: "cover" }}
              priority
            />
            <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.700, transparent)" />
          </Box>

          <Box p={{ base: 5, md: 6 }}>
            <HStack spacing={3} mb={4}>
              {getServiceIcon(service.title)}
              <Heading size="md">{service.title}</Heading>
            </HStack>

            <Stack spacing={4}>
              {service.schedules.map((schedule) => (
                <Box key={schedule.day}>
                  <Text fontWeight="semibold" mb={2}>
                    {schedule.day}
                  </Text>
                  <Wrap spacing={2}>
                    {schedule.times.map((time) => (
                      <WrapItem key={time}>
                        <Tag size="md" variant="subtle" colorScheme="brand">
                          <TagLabel>{time}</TagLabel>
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}
