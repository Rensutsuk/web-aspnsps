import Image from "next/image";

import { Badge, Box, Button, Heading, HStack, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { ArrowRight, Users } from "lucide-react";

import type { Ministry } from "@/lib/ministriesData";

type MinistryCardProps = {
  ministry: Ministry;
  onOpen: (ministry: Ministry) => void;
};

export function MinistryCard({ ministry, onOpen }: MinistryCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
      boxShadow="sm"
      transition="transform 200ms ease, box-shadow 200ms ease"
      _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
    >
      <Box position="relative" h="220px">
        <Image src={ministry.image} alt={ministry.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
      </Box>

      <Stack spacing={4} p={5}>
        <Stack spacing={2}>
          <HStack justify="space-between" align="start">
            <Heading size="md">{ministry.title}</Heading>
            <Badge colorScheme="brand" borderRadius="full" px={2.5} py={1}>
              <HStack spacing={1}>
                <Users size={12} />
                <Text fontSize="xs">{ministry.category.slice(0, 1).toUpperCase() + ministry.category.slice(1, -1)}</Text>
              </HStack>
            </Badge>
          </HStack>
          <Text color="gray.600" noOfLines={3} _dark={{ color: "gray.300" }}>
            {ministry.summary}
          </Text>
        </Stack>

        <Wrap spacing={2}>
          {ministry.tags.slice(0, 3).map((tag) => (
            <WrapItem key={tag}>
              <Badge variant="subtle" colorScheme="brand" borderRadius="full" px={2.5} py={1}>
                {tag}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>

        <Button alignSelf="flex-start" variant="ghost" colorScheme="brand" rightIcon={<ArrowRight size={16} />} onClick={() => onOpen(ministry)}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
}

