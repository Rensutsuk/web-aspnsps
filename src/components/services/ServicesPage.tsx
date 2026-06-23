"use client";

import NextLink from "next/link";
import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { CalendarCheck, FileText, Phone, Search, Stethoscope, Users } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceDrawer } from "@/components/services/ServiceDrawer";
import {
  officeRequests,
  parishServices,
  servicesHeroImage,
  type OfficeRequest,
  type ParishService,
  type ServiceCategory,
} from "@/lib/servicesData";
import { siteConfig } from "@/lib/siteConfig";

type FilterKey = "all" | ServiceCategory;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: "sacrament", label: "Sacraments" },
  { key: "pastoral", label: "Pastoral Care" },
];

function matchesQuery(service: ParishService, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  return (
    service.title.toLowerCase().includes(q) ||
    service.summary.toLowerCase().includes(q) ||
    service.description.toLowerCase().includes(q) ||
    service.tags.some((tag) => tag.toLowerCase().includes(q)) ||
    service.quickFacts.some((fact) => `${fact.label} ${fact.value}`.toLowerCase().includes(q)) ||
    service.requirements.some((group) =>
      [group.title, ...group.items].some((item) => item.toLowerCase().includes(q)),
    )
  );
}

function OfficeRequestCard({ request }: { request: OfficeRequest }) {
  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      p={{ base: 5, md: 6 }}
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    >
      <Stack spacing={4}>
        <Heading size="md">{request.title}</Heading>
        <Text color="gray.600" _dark={{ color: "gray.300" }}>
          {request.summary}
        </Text>
        <Button as={NextLink} href={request.actionHref} alignSelf="flex-start" variant="outline" colorScheme="brand">
          {request.actionLabel}
        </Button>
      </Stack>
    </Box>
  );
}

export function ServicesPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ParishService | null>(null);

  const counts = useMemo(
    () => ({
      all: parishServices.length,
      sacrament: parishServices.filter((item) => item.category === "sacrament").length,
      pastoral: parishServices.filter((item) => item.category === "pastoral").length,
    }),
    [],
  );

  const filteredServices = useMemo(() => {
    return parishServices.filter((service) => {
      if (selectedFilter !== "all" && service.category !== selectedFilter) return false;
      return matchesQuery(service, query);
    });
  }, [query, selectedFilter]);

  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        eyebrow="Parish Services"
        title="Church Services"
        description="Browse the parish services most families ask about, open each service for details, and contact the office quickly when you are ready to coordinate."
        backgroundImageSrc={servicesHeroImage}
        backgroundImageAlt="Parish services"
        actions={
          <>
            <Button as={NextLink} href={`tel:${siteConfig.contact.phone}`} colorScheme="brand" leftIcon={<Phone size={18} />}>
              Call Parish Office
            </Button>
            <Button
              as={NextLink}
              href="/schedule"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.700"
              _hover={{ bg: "whiteAlpha.200" }}
              leftIcon={<CalendarCheck size={18} />}
            >
              View Service Schedule
            </Button>
          </>
        }
        meta={[
          {
            label: "Core Services",
            value: `${parishServices.length} available`,
          },
          {
            label: "Need documents?",
            value: "Office assistance available",
          },
          {
            label: "Parish Office",
            value: (
              <Link as={NextLink} href={`tel:${siteConfig.contact.phone}`} fontWeight="semibold" color="white">
                {siteConfig.contact.phone}
              </Link>
            ),
          },
        ]}
      />

      <Container maxW="6xl" mt={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 8, md: 10 }}>
          <Box
            bg="brand.50"
            borderWidth="1px"
            borderColor="brand.100"
            borderRadius="2xl"
            px={{ base: 5, md: 8 }}
            py={{ base: 6, md: 7 }}
            _dark={{ bg: "brand.900", borderColor: "brand.800" }}
          >
            <Grid templateColumns={{ base: "1fr", md: "1.4fr auto" }} gap={5} alignItems="center">
              <Box>
                <Heading size="md">Choose a service, then open the details panel</Heading>
                <Text mt={2} color="gray.700" _dark={{ color: "gray.200" }}>
                  Each card shows the usual starting point, availability, and lead time so parishioners can decide what
                  to prepare before visiting the office.
                </Text>
              </Box>
              <Button as={NextLink} href={`tel:${siteConfig.contact.phone}`} colorScheme="brand" leftIcon={<Phone size={18} />}>
                {siteConfig.contact.phone}
              </Button>
            </Grid>
          </Box>

          <Box
            bg="gray.50"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="2xl"
            p={{ base: 5, md: 6 }}
            _dark={{ bg: "gray.900", borderColor: "gray.700" }}
          >
            <Stack spacing={5}>
              <Tabs
                index={filters.findIndex((item) => item.key === selectedFilter)}
                onChange={(index) => setSelectedFilter(filters[index]?.key ?? "all")}
                variant="soft-rounded"
                colorScheme="brand"
              >
                <TabList flexWrap="wrap" gap={2}>
                  {filters.map((filter) => (
                    <Tab key={filter.key}>
                      {filter.label} ({counts[filter.key]})
                    </Tab>
                  ))}
                </TabList>
              </Tabs>

              <Grid templateColumns={{ base: "1fr", md: "1.2fr auto" }} gap={4} alignItems="center">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Search size={18} />
                  </InputLeftElement>
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search services, requirements, or preparation notes..."
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                  />
                </InputGroup>

                <HStack spacing={2} color="gray.600" _dark={{ color: "gray.300" }}>
                  <Users size={16} />
                  <Text fontSize="sm">{filteredServices.length} result(s)</Text>
                </HStack>
              </Grid>
            </Stack>
          </Box>

          {filteredServices.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={4}>
              {filteredServices.map((service) => (
                <ServiceCard key={service.slug} service={service} onOpen={setSelectedService} />
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
              <Heading size="md">No services matched your search</Heading>
              <Text mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                Try a broader keyword such as &quot;baptism&quot;, &quot;schedule&quot;, or &quot;documents&quot;.
              </Text>
              <Button mt={4} onClick={() => setQuery("")}>
                Clear search
              </Button>
            </Box>
          )}

          <Box>
            <Stack spacing={4} textAlign={{ base: "left", md: "center" }} mb={{ base: 6, md: 8 }}>
              <HStack justify={{ base: "flex-start", md: "center" }} spacing={2}>
                <FileText size={20} />
                <Heading size={{ base: "lg", md: "xl" }}>Parish Office Requests</Heading>
              </HStack>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Some needs are better handled directly by the office even if they are not part of the core services grid.
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {officeRequests.map((request) => (
                <OfficeRequestCard key={request.title} request={request} />
              ))}
            </SimpleGrid>
          </Box>

          <Box
            bg="brand.50"
            borderWidth="1px"
            borderColor="brand.100"
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            _dark={{ bg: "brand.900", borderColor: "brand.800" }}
          >
            <Stack spacing={4} textAlign={{ base: "left", md: "center" }}>
              <HStack justify={{ base: "flex-start", md: "center" }} spacing={2}>
                <Stethoscope size={20} />
                <Heading size={{ base: "md", md: "lg" }}>Need help choosing the right service?</Heading>
              </HStack>
              <Text color="gray.700" _dark={{ color: "gray.200" }}>
                Contact the parish office for clarification on requirements, special cases, or schedule changes before
                coming to the church.
              </Text>
              <HStack spacing={3} justify={{ base: "flex-start", md: "center" }} flexWrap="wrap">
                <Button as={NextLink} href={`tel:${siteConfig.contact.phone}`} colorScheme="brand">
                  Call {siteConfig.contact.phone}
                </Button>
                <Button as={NextLink} href={`mailto:${siteConfig.contact.email}`} variant="outline" colorScheme="brand">
                  Email the office
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Container>

      <ServiceDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </Box>
  );
}
