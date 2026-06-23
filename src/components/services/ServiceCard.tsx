import Image from "next/image";

import { Badge, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Bell, Church, HeartHandshake, Info } from "lucide-react";

import type { ParishService } from "@/lib/servicesData";

type ServiceCardProps = {
  service: ParishService;
  onOpen: (service: ParishService) => void;
};

function getCategoryLabel(service: ParishService) {
  return service.category === "sacrament" ? "Sacrament" : "Pastoral Care";
}

function getCategoryIcon(service: ParishService) {
  return service.category === "sacrament" ? <Church size={14} /> : <HeartHandshake size={14} />;
}

function getUrgencyLabel(service: ParishService) {
  if (service.urgency === "urgent") return "Urgent";
  if (service.urgency === "time-sensitive") return "Plan Ahead";
  return null;
}

export function ServiceCard({ service, onOpen }: ServiceCardProps) {
  const urgencyLabel = getUrgencyLabel(service);

  return (
    <Box
      as="button"
      type="button"
      onClick={() => onOpen(service)}
      textAlign="left"
      w="full"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      transition="transform 220ms ease, box-shadow 220ms ease"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "var(--chakra-colors-blue-400)", outlineOffset: "3px" }}
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    >
      <Box position="relative" h={{ base: "360px", md: "420px" }}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
        <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.900, blackAlpha.700, transparent)" />
        <HStack position="absolute" left={4} right={4} top={4} justify="space-between" align="start">
          <Badge colorScheme="brand" borderRadius="full" px={3} py={1}>
            <HStack spacing={1.5}>
              {getCategoryIcon(service)}
              <Text fontSize="xs">{getCategoryLabel(service)}</Text>
            </HStack>
          </Badge>
          {urgencyLabel ? (
            <Badge colorScheme={service.urgency === "urgent" ? "red" : "orange"} borderRadius="full" px={3} py={1}>
              <HStack spacing={1.5}>
                <Bell size={12} />
                <Text fontSize="xs">{urgencyLabel}</Text>
              </HStack>
            </Badge>
          ) : null}
        </HStack>

        <Box position="absolute" left={0} right={0} bottom={0} p={5} color="white">
          <Stack spacing={3} align="start">
            <Stack spacing={2}>
              <Heading size="lg" color="white">
                {service.title}
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.900" noOfLines={3}>
                {service.summary}
              </Text>
            </Stack>

            <HStack spacing={2} color="whiteAlpha.900" bg="blackAlpha.400" px={3} py={2} borderRadius="full">
              <Info size={16} />
              <Text fontSize="sm" fontWeight="medium" display={{ base: "none", md: "block" }}>
                Click for more details
              </Text>
              <Text fontSize="sm" fontWeight="medium" display={{ base: "block", md: "none" }}>
                Tap for more details
              </Text>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
