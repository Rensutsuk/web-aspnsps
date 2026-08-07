import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowLeft, CalendarDays, Church, Mail, MapPin } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/siteConfig";

const helpfulLinks = [
  {
    label: "Return Home",
    href: "/",
    description: "Go back to the main page and continue exploring the parish website.",
    icon: Church,
  },
  {
    label: "Mass Schedule",
    href: "/schedule",
    description: "View service times, liturgy schedules, and parish worship information.",
    icon: CalendarDays,
  },
  {
    label: "Contact Us",
    href: "/contact",
    description: "Reach the parish office if you need help finding a ministry or service.",
    icon: Mail,
  },
] as const;

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Box
        pt={{ base: "56px", md: "64px" }}
        minH="100dvh"
        bg="gray.50"
        _dark={{ bg: "gray.900" }}
        style={{ scrollPaddingTop: "calc(56px + env(safe-area-inset-top, 0px))" }}
      >
        <PageHeader
          eyebrow="404"
          title="This page could not be found"
          description="The page may have moved, the link may be outdated, or the address may have been typed incorrectly. You can return to the homepage or continue with one of the parish sections below."
          backgroundImageSrc="/img/home/hero.jpg"
          backgroundImageAlt="Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro"
          actions={
            <>
              <Button as="a" href="/" colorScheme="brand" size="lg" leftIcon={<ArrowLeft size={18} />}>
                Back to Home
              </Button>
              <Button as="a" href="/contact" size="lg" variant="outline" colorScheme="whiteAlpha">
                Contact Parish Office
              </Button>
            </>
          }
          meta={[
            { label: "Parish Office", value: siteConfig.contact.phone },
            { label: "Email", value: siteConfig.contact.email },
            { label: "Location", value: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}` },
          ]}
        />

        <Container maxW="6xl" py={{ base: 10, md: 14 }}>
          <Grid templateColumns={{ base: "1fr", lg: "1.4fr 0.9fr" }} gap={8}>
            <GridItem>
              <Stack spacing={6}>
                <Box
                  bg="white"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="3xl"
                  p={{ base: 6, md: 8 }}
                  shadow="sm"
                  _dark={{ bg: "gray.900", borderColor: "gray.800" }}
                >
                  <Stack spacing={3}>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      letterSpacing="widest"
                      textTransform="uppercase"
                      color="brand.600"
                    >
                      Helpful Links
                    </Text>
                    <Heading size="lg">Continue to a useful parish section</Heading>
                    <Text color="gray.600" _dark={{ color: "gray.300" }}>
                      If you landed here from an older bookmark or shared link, these shortcuts will usually get
                      you back on track quickly.
                    </Text>
                  </Stack>

                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={6}>
                    {helpfulLinks.map((item) => (
                      <Box
                        key={item.href}
                        as="a"
                        href={item.href}
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="2xl"
                        p={5}
                        bg="gray.50"
                        transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
                        _hover={{
                          transform: "translateY(-3px)",
                          borderColor: "brand.300",
                          shadow: "md",
                        }}
                        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                      >
                        <HStack align="flex-start" spacing={3}>
                          <Box
                            p={2.5}
                            borderRadius="xl"
                            bg="brand.50"
                            color="brand.700"
                            _dark={{ bg: "brand.900", color: "brand.100" }}
                          >
                            <item.icon size={18} />
                          </Box>
                          <Stack spacing={1.5}>
                            <Text fontWeight="semibold">{item.label}</Text>
                            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
                              {item.description}
                            </Text>
                          </Stack>
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </Stack>
            </GridItem>

            <GridItem>
              <Stack spacing={6}>
                <Box
                  bg="white"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="3xl"
                  p={{ base: 6, md: 7 }}
                  shadow="sm"
                  _dark={{ bg: "gray.900", borderColor: "gray.800" }}
                >
                  <Stack spacing={4}>
                    <Heading size="md">Need help locating something specific?</Heading>
                    <Text color="gray.600" _dark={{ color: "gray.300" }}>
                      The parish office can guide you to the correct page, sacramental service, or ministry contact.
                    </Text>
                    <Stack spacing={3}>
                      <HStack align="flex-start" spacing={3}>
                        <Box mt={1} color="brand.600">
                          <Mail size={18} />
                        </Box>
                        <Stack spacing={0.5}>
                          <Text fontWeight="semibold">Email</Text>
                          <Text color="gray.600" _dark={{ color: "gray.300" }}>
                            {siteConfig.contact.email}
                          </Text>
                        </Stack>
                      </HStack>
                      <HStack align="flex-start" spacing={3}>
                        <Box mt={1} color="brand.600">
                          <MapPin size={18} />
                        </Box>
                        <Stack spacing={0.5}>
                          <Text fontWeight="semibold">Visit the parish</Text>
                          <Text color="gray.600" _dark={{ color: "gray.300" }}>
                            {siteConfig.contact.address.line1}
                          </Text>
                          <Text color="gray.600" _dark={{ color: "gray.300" }}>
                            {siteConfig.contact.address.line2}
                          </Text>
                        </Stack>
                      </HStack>
                    </Stack>
                    <Button as="a" href={siteConfig.contact.mapExternalUrl} target="_blank" rel="noreferrer" variant="outline">
                      Open in Google Maps
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
