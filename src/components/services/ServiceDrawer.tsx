import Image from "next/image";
import NextLink from "next/link";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Heading,
  HStack,
  Link,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { AlertCircle, CalendarClock, ClipboardList, Phone } from "lucide-react";

import type { ParishService } from "@/lib/servicesData";

type ServiceDrawerProps = {
  service: ParishService | null;
  onClose: () => void;
};

export function ServiceDrawer({ service, onClose }: ServiceDrawerProps) {
  return (
    <Drawer isOpen={Boolean(service)} placement="right" size="lg" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader pr={12}>{service?.title ?? "Service details"}</DrawerHeader>
        <DrawerBody pb={6}>
          {service ? (
            <Stack spacing={6}>
              <Box position="relative" h={{ base: "220px", md: "280px" }} borderRadius="2xl" overflow="hidden">
                <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 720px" style={{ objectFit: "cover" }} />
                <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.700, transparent)" />
                <Box position="absolute" left={0} right={0} bottom={0} p={5}>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    {service.category === "sacrament" ? "Sacrament" : "Pastoral Care"}
                  </Text>
                  <Heading size="md" color="white" mt={1}>
                    {service.title}
                  </Heading>
                </Box>
              </Box>

              <Text color="gray.700" _dark={{ color: "gray.200" }}>
                {service.description}
              </Text>

              {service.urgency === "urgent" ? (
                <Box
                  bg="red.50"
                  borderWidth="1px"
                  borderColor="red.100"
                  borderRadius="xl"
                  px={4}
                  py={4}
                  _dark={{ bg: "red.900", borderColor: "red.800" }}
                >
                  <HStack align="start" spacing={3}>
                    <AlertCircle size={18} />
                    <Box>
                      <Text fontWeight="semibold">Urgent assistance recommended</Text>
                      <Text fontSize="sm" color="gray.700" _dark={{ color: "gray.200" }}>
                        For time-sensitive pastoral needs, calling the parish office is usually faster than sending an email.
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ) : null}

              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={3}>
                {service.quickFacts.map((fact) => (
                  <Box
                    key={fact.label}
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="xl"
                    px={4}
                    py={4}
                    bg="gray.50"
                    _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                  >
                    <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                      {fact.label}
                    </Text>
                    <Text mt={1} fontWeight="semibold">
                      {fact.value}
                    </Text>
                  </Box>
                ))}
              </Grid>

              <HStack spacing={3} flexWrap="wrap">
                <Button as={NextLink} href={service.contact.primaryHref} colorScheme="brand" leftIcon={<Phone size={18} />}>
                  {service.contact.primaryLabel}
                </Button>
                {service.contact.secondaryHref && service.contact.secondaryValue ? (
                  <Button as={NextLink} href={service.contact.secondaryHref} variant="outline" colorScheme="brand">
                    {service.contact.secondaryValue}
                  </Button>
                ) : null}
              </HStack>

              <Tabs variant="soft-rounded" colorScheme="brand" isFitted>
                <TabList mb={5}>
                  <Tab>Overview</Tab>
                  <Tab>Requirements</Tab>
                  <Tab>Schedule</Tab>
                  <Tab>Contact</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    <Stack spacing={5}>
                      <Box
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        p={5}
                        _dark={{ borderColor: "gray.700" }}
                      >
                        <HStack spacing={2} mb={3}>
                          <CalendarClock size={18} />
                          <Heading size="sm">What to expect</Heading>
                        </HStack>
                        <Text color="gray.700" _dark={{ color: "gray.200" }}>
                          {service.summary}
                        </Text>
                      </Box>

                      <Box
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        p={5}
                        _dark={{ borderColor: "gray.700" }}
                      >
                        <HStack spacing={2} mb={3}>
                          <AlertCircle size={18} />
                          <Heading size="sm">Important reminders</Heading>
                        </HStack>
                        <UnorderedList spacing={3} pl={5} color="gray.700" _dark={{ color: "gray.200" }}>
                          {service.reminders.map((reminder) => (
                            <ListItem key={reminder}>{reminder}</ListItem>
                          ))}
                        </UnorderedList>
                      </Box>
                    </Stack>
                  </TabPanel>

                  <TabPanel px={0}>
                    <Stack spacing={4}>
                      {service.requirements.map((group) => (
                        <Box
                          key={group.title}
                          borderWidth="1px"
                          borderColor="gray.200"
                          borderRadius="2xl"
                          p={5}
                          bg="gray.50"
                          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                        >
                          <HStack spacing={2} mb={3}>
                            <ClipboardList size={18} />
                            <Heading size="sm">{group.title}</Heading>
                          </HStack>
                          <UnorderedList spacing={3} pl={5} color="gray.700" _dark={{ color: "gray.200" }}>
                            {group.items.map((item) => (
                              <ListItem key={item}>{item}</ListItem>
                            ))}
                          </UnorderedList>
                        </Box>
                      ))}
                    </Stack>
                  </TabPanel>

                  <TabPanel px={0}>
                    <Stack spacing={4}>
                      {service.schedule.map((item) => (
                        <Box
                          key={item.label}
                          borderWidth="1px"
                          borderColor="gray.200"
                          borderRadius="2xl"
                          p={5}
                          _dark={{ borderColor: "gray.700" }}
                        >
                          <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                            {item.label}
                          </Text>
                          <Heading size="sm" mt={1}>
                            {item.value}
                          </Heading>
                          {item.note ? (
                            <Text mt={2} color="gray.700" _dark={{ color: "gray.200" }}>
                              {item.note}
                            </Text>
                          ) : null}
                        </Box>
                      ))}
                    </Stack>
                  </TabPanel>

                  <TabPanel px={0}>
                    <Stack spacing={4}>
                      <Box
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        p={5}
                        bg="gray.50"
                        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                      >
                        <Heading size="sm" mb={3}>
                          Best way to reach the parish
                        </Heading>
                        <Stack spacing={2} color="gray.700" _dark={{ color: "gray.200" }}>
                          <Text>
                            {service.contact.primaryLabel}:{" "}
                            <Link as={NextLink} href={service.contact.primaryHref} color="brand.700" _dark={{ color: "brand.200" }}>
                              {service.contact.primaryValue}
                            </Link>
                          </Text>
                          {service.contact.secondaryHref && service.contact.secondaryValue && service.contact.secondaryLabel ? (
                            <Text>
                              {service.contact.secondaryLabel}:{" "}
                              <Link as={NextLink} href={service.contact.secondaryHref} color="brand.700" _dark={{ color: "brand.200" }}>
                                {service.contact.secondaryValue}
                              </Link>
                            </Text>
                          ) : null}
                          {service.contact.note ? <Text fontSize="sm">{service.contact.note}</Text> : null}
                        </Stack>
                      </Box>
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          ) : null}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
