"use client";

import NextLink from "next/link";
import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Search, Users } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { MinistryCard } from "@/components/ministries/MinistryCard";
import { ministryCategories, ministriesData, type Ministry, type MinistryCategory } from "@/lib/ministriesData";
import { siteConfig } from "@/lib/siteConfig";

const joinFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJzRlBDTWsfZjpqkkrj7zS0XBZ2U08kCS2atzM3mIIuAligQ/viewform";

export function MinistriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<MinistryCategory>("ministries");
  const [query, setQuery] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const counts = useMemo(() => {
    return Object.fromEntries(
      ministryCategories.map((category) => [
        category.key,
        ministriesData.filter((item) => item.category === category.key).length,
      ]),
    ) as Record<MinistryCategory, number>;
  }, []);

  const filteredMinistries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ministriesData.filter((item) => {
      if (item.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, selectedCategory]);

  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        eyebrow="Parish Life"
        title="Ministries, Organizations, and Apostolates"
        description="Discover where you can serve, grow, and participate in the life of the parish. Browse by category, search by interest, and open each ministry to learn more."
        backgroundImageSrc="/img/about/church-building.jpg"
        backgroundImageAlt="Parish community"
        actions={
          <>
            <Button as={Link} href={joinFormUrl} isExternal colorScheme="brand">
              Join a Ministry
            </Button>
            <Button as={NextLink} href="/contact" variant="outline" color="white" borderColor="whiteAlpha.700" _hover={{ bg: "whiteAlpha.200" }}>
              Contact Parish Office
            </Button>
          </>
        }
        meta={[
          {
            label: "Categories",
            value: `${ministryCategories.length} groups`,
          },
          {
            label: "Directory Entries",
            value: `${ministriesData.length} ministries`,
          },
          {
            label: "Need help?",
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
            bg="gray.50"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="2xl"
            p={{ base: 5, md: 6 }}
            _dark={{ bg: "gray.900", borderColor: "gray.700" }}
          >
            <Stack spacing={5}>
              <Tabs
                index={ministryCategories.findIndex((category) => category.key === selectedCategory)}
                onChange={(index) => setSelectedCategory(ministryCategories[index]?.key ?? "ministries")}
                variant="soft-rounded"
                colorScheme="brand"
              >
                <TabList flexWrap="wrap" gap={2}>
                  {ministryCategories.map((category) => (
                    <Tab key={category.key}>
                      {category.label} ({counts[category.key]})
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
                    placeholder={`Search ${selectedCategory}...`}
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                  />
                </InputGroup>

                <HStack spacing={2} color="gray.600" _dark={{ color: "gray.300" }}>
                  <Users size={16} />
                  <Text fontSize="sm">{filteredMinistries.length} result(s)</Text>
                </HStack>
              </Grid>

              <Wrap spacing={2}>
                {Array.from(new Set(filteredMinistries.flatMap((item) => item.tags))).slice(0, 8).map((tag) => (
                  <WrapItem key={tag}>
                    <Button size="xs" variant="outline" onClick={() => setQuery(tag)}>
                      {tag}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
          </Box>

          {filteredMinistries.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
              {filteredMinistries.map((ministry) => (
                <MinistryCard key={ministry.slug} ministry={ministry} onOpen={setSelectedMinistry} />
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
              <Heading size="md">No ministries found</Heading>
              <Text mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                Try a different keyword or switch to another category.
              </Text>
              <Button mt={4} onClick={() => setQuery("")}>
                Clear search
              </Button>
            </Box>
          )}

          <Box
            bg="brand.50"
            borderWidth="1px"
            borderColor="brand.100"
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            _dark={{ bg: "brand.900", borderColor: "brand.800" }}
          >
            <Stack spacing={4} textAlign={{ base: "left", md: "center" }}>
              <Heading size={{ base: "md", md: "lg" }}>Ready to serve in the parish?</Heading>
              <Text color="gray.700" _dark={{ color: "gray.200" }}>
                If a ministry interests you, submit the join form or contact the parish office so we can guide you to
                the right group.
              </Text>
              <HStack spacing={3} justify={{ base: "flex-start", md: "center" }} flexWrap="wrap">
                <Button as={Link} href={joinFormUrl} isExternal colorScheme="brand">
                  Open Join Form
                </Button>
                <Button as={NextLink} href={`tel:${siteConfig.contact.phone}`} variant="outline" colorScheme="brand">
                  Call {siteConfig.contact.phone}
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Container>

      <Drawer isOpen={Boolean(selectedMinistry)} placement="right" size="md" onClose={() => setSelectedMinistry(null)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{selectedMinistry?.title}</DrawerHeader>
          <DrawerBody pb={6}>
            {selectedMinistry ? (
              <Stack spacing={5}>
                <Box position="relative" h="220px" borderRadius="xl" overflow="hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedMinistry.image}
                    alt={selectedMinistry.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>

                <Text color="gray.700" _dark={{ color: "gray.200" }}>
                  {selectedMinistry.description}
                </Text>

                <Box>
                  <Heading size="sm" mb={3}>
                    Usual Activities
                  </Heading>
                  <Stack spacing={2}>
                    {selectedMinistry.activities.map((activity) => (
                      <Box
                        key={activity}
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="lg"
                        px={3}
                        py={2}
                        _dark={{ borderColor: "gray.700" }}
                      >
                        <Text>{activity}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Wrap spacing={2}>
                  {selectedMinistry.tags.map((tag) => (
                    <WrapItem key={tag}>
                      <Button size="xs" variant="outline">
                        {tag}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>

                <Button as={Link} href={joinFormUrl} isExternal colorScheme="brand">
                  Join This Ministry
                </Button>
              </Stack>
            ) : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

