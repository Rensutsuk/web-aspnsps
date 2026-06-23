"use client";

import Image from "next/image";
import NextLink from "next/link";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Heading,
  HStack,
  Link,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Banknote, CalendarCheck, ClipboardList, FileText, HeartHandshake, Phone, Users } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { siteConfig } from "@/lib/siteConfig";

function createImageUrl(prompt: string, imageSize: string) {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${encodeURIComponent(imageSize)}`;
}

const images = {
  hero: createImageUrl(
    "Ultra realistic documentary photo, catholic church wedding ceremony inside a historic Manila parish church, bride and groom at the altar, warm natural light, floral accents, solemn and joyful atmosphere, shallow depth of field, 35mm, high detail",
    "landscape_16_9",
  ),
  documents: createImageUrl(
    "Ultra realistic photo, close-up of wedding preparation documents on a wooden desk, certificates and forms neatly arranged, elegant pen and white flowers, soft daylight, high detail, natural colors",
    "landscape_4_3",
  ),
  guidance: createImageUrl(
    "Ultra realistic photo, couple speaking with a priest in a church office, calm supportive atmosphere, warm lighting, respectful candid moment, high detail, natural colors",
    "landscape_4_3",
  ),
};

const seatingArrangementImage = "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MR2HxXpONjIzrhcLZFMG7lqYpdQCf9vaRBPD0";

const contactInfo = {
  parishOffice: {
    address: "2042 Calamba corner Instruccion St., Sampaloc, Manila",
    hours: "Tuesday to Sunday, 8:00am to 12nn | 2:00pm to 6:00pm",
  },
  weddingCoordinator: {
    name: "Mr. Edward Cornel",
    phone: "0945-2148307",
    facebookUrl: "https://www.facebook.com/EJC24",
    facebookLabel: "EJC24",
  },
};

const requiredDocuments = [
  'New copy of Baptismal and Confirmation certificates (valid for 6 months) with annotation "FOR MARRIAGE PURPOSES ONLY"',
  "PSA Certificate of Live Birth",
  "PSA Certificate of No Marriage (CENOMAR)",
  "Marriage License from Civil Registry (valid for 120 days)",
  "Certificate of Freedom to Marry (for Filipinos living abroad)",
  "Certificate of attendance in Pre-Cana Seminar",
  "List of names and addresses of sponsors (1–6 pairs)",
];

const rules = [
  "Reservation requires ₱2,000 non-refundable down payment",
  "Required documents must be completed 2 weeks before the wedding",
  "Throwing rice, confetti, etc. inside the church is not allowed",
  "Only liturgical songs and melodies are permitted",
  "Photographers must secure permits and follow church protocols",
  "Wedding coordinators must coordinate with the Church Wedding Coordinator",
];

const punctualityRules = [
  "15 minutes late: No choir",
  "30 minutes late: No homily",
  "45 minutes late: Marriage rites only (no Mass)",
  "1 hour late: Additional conditions apply",
];

export function MarriagePage() {
  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        eyebrow="Sacrament of Matrimony"
        title="Church Marriage"
        description={`The ${siteConfig.parishNameFull} offers wedding services for couples seeking the sacrament of matrimony.`}
        backgroundImageSrc={images.hero}
        backgroundImageAlt="Church Marriage"
        actions={
          <>
            <Button as={NextLink} href="/schedule" colorScheme="brand" leftIcon={<CalendarCheck size={18} />}>
              View Mass Schedule
            </Button>
            <Button
              as={NextLink}
              href={`tel:${siteConfig.contact.phone}`}
              variant="outline"
              color="white"
              borderColor="whiteAlpha.700"
              _hover={{ bg: "whiteAlpha.200" }}
              leftIcon={<Phone size={18} />}
            >
              Call Parish Office
            </Button>
          </>
        }
      />

      <Container maxW="6xl" mt={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 10, md: 12 }}>
          <Box
            bg="brand.50"
            borderWidth="1px"
            borderColor="brand.100"
            borderRadius="2xl"
            px={{ base: 5, md: 8 }}
            py={{ base: 6, md: 7 }}
            _dark={{ bg: "brand.900", borderColor: "brand.800" }}
          >
            <HStack align="start" spacing={4} flexWrap="wrap" justify="space-between">
              <Box>
                <Heading size="md">Planning to get married at the parish?</Heading>
                <Text mt={2} color="gray.700" _dark={{ color: "gray.200" }}>
                  Start early so you have enough time for requirements, seminars, and coordination. For updated fees and
                  availability, please confirm with the parish office.
                </Text>
              </Box>
              <Button as={NextLink} href={`tel:${siteConfig.contact.phone}`} colorScheme="brand" leftIcon={<Phone size={18} />}>
                {siteConfig.contact.phone}
              </Button>
            </HStack>
          </Box>

          <Box>
            <Stack spacing={4} textAlign="center" mb={{ base: 8, md: 10 }}>
              <HStack justify="center" spacing={2}>
                <FileText size={20} />
                <Heading size={{ base: "lg", md: "xl" }}>Wedding Basic Requirements</Heading>
              </HStack>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Prepare these documents and formation requirements before your wedding date.
              </Text>
            </Stack>

            <Grid templateColumns={{ base: "1fr", lg: "1.2fr 1fr" }} gap={{ base: 8, md: 10 }} alignItems="start">
              <Box
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="2xl"
                px={{ base: 5, md: 8 }}
                py={{ base: 6, md: 8 }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Heading size="md" mb={4}>
                  Required Documents
                </Heading>
                <UnorderedList spacing={3} color="gray.700" _dark={{ color: "gray.200" }} pl={5}>
                  {requiredDocuments.map((item) => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </UnorderedList>
                <Divider my={6} />
                <HStack align="start" spacing={3}>
                  <ClipboardList size={20} />
                  <Box>
                    <Text fontWeight="semibold">Tip</Text>
                    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
                      Documents with validity periods (e.g., 6 months) should be requested closer to your target date.
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Box position="relative" borderRadius="2xl" overflow="hidden" minH={{ base: 240, md: 320 }}>
                <Image
                  src={images.documents}
                  alt="Wedding documents"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.700, transparent)" />
              </Box>
            </Grid>
          </Box>

          <Box>
            <Stack spacing={4} textAlign="center" mb={{ base: 8, md: 10 }}>
              <HStack justify="center" spacing={2}>
                <HeartHandshake size={20} />
                <Heading size={{ base: "lg", md: "xl" }}>Special Cases</Heading>
              </HStack>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Additional requirements may apply depending on your situation.
              </Text>
            </Stack>

            <Grid templateColumns={{ base: "1fr", lg: "1fr 1.1fr" }} gap={{ base: 8, md: 10 }} alignItems="start">
              <Box position="relative" borderRadius="2xl" overflow="hidden" minH={{ base: 240, md: 320 }}>
                <Image
                  src={images.guidance}
                  alt="Marriage guidance"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.700, transparent)" />
              </Box>

              <Box
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="2xl"
                px={{ base: 5, md: 8 }}
                py={{ base: 6, md: 8 }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Heading size="md" mb={4}>
                  Additional Requirements
                </Heading>
                <Accordion allowMultiple>
                  <AccordionItem border="0">
                    <AccordionButton px={0}>
                      <Box as="span" flex="1" textAlign="left" fontWeight="semibold">
                        Mixed Marriages (Catholic & Non-Catholic)
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={0} pt={2}>
                      <UnorderedList spacing={2} pl={5} color="gray.700" _dark={{ color: "gray.200" }}>
                        <ListItem>Certificate of freedom to marry from Non-Catholic Minister</ListItem>
                        <ListItem>Promise for Mixed Marriage Form</ListItem>
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="0">
                    <AccordionButton px={0}>
                      <Box as="span" flex="1" textAlign="left" fontWeight="semibold">
                        Filipino & Foreigner
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={0} pt={2}>
                      <UnorderedList spacing={2} pl={5} color="gray.700" _dark={{ color: "gray.200" }}>
                        <ListItem>Clearance from Chancery Office of the Archdiocese</ListItem>
                        <ListItem>Certificate of freedom to marry from the foreigner&apos;s parish</ListItem>
                        <ListItem>Legal capacity to marry from the foreigner&apos;s consulate</ListItem>
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="0">
                    <AccordionButton px={0}>
                      <Box as="span" flex="1" textAlign="left" fontWeight="semibold">
                        Other Special Cases
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={0} pt={2}>
                      <UnorderedList spacing={2} pl={5} color="gray.700" _dark={{ color: "gray.200" }}>
                        <ListItem>Widowers/widows: Death Certificate of deceased partner</ListItem>
                        <ListItem>Military personnel: Certification of Freedom to Marry</ListItem>
                        <ListItem>Annulled marriages: Document of Nullity and approval letter</ListItem>
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Grid>
          </Box>

          <Box>
            <Stack spacing={4} textAlign="center" mb={{ base: 8, md: 10 }}>
              <HStack justify="center" spacing={2}>
                <Banknote size={20} />
                <Heading size={{ base: "lg", md: "xl" }}>Rules and Fees</Heading>
              </HStack>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                Please review the guidelines to help ensure a prayerful and orderly celebration.
              </Text>
            </Stack>

            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={{ base: 8, md: 10 }} alignItems="start">
              <Box
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="2xl"
                px={{ base: 5, md: 8 }}
                py={{ base: 6, md: 8 }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Heading size="md" mb={4}>
                  Important Rules
                </Heading>
                <UnorderedList spacing={3} color="gray.700" _dark={{ color: "gray.200" }} pl={5}>
                  {rules.map((item) => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                  <ListItem>
                    Punctuality is strictly enforced:
                    <UnorderedList spacing={2} pl={6} mt={2}>
                      {punctualityRules.map((item) => (
                        <ListItem key={item}>{item}</ListItem>
                      ))}
                    </UnorderedList>
                  </ListItem>
                </UnorderedList>
                <Text mt={5} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
                  Policies may be updated by the parish. Always confirm details during your reservation.
                </Text>
              </Box>

              <Box
                bg="brand.600"
                borderRadius="2xl"
                px={{ base: 5, md: 7 }}
                py={{ base: 6, md: 7 }}
                color="white"
                boxShadow="lg"
                _dark={{ bg: "brand.700" }}
              >
                <Heading size="md">Wedding Package</Heading>
                <Text fontSize="3xl" fontWeight="bold" mt={3}>
                  ₱20,000
                </Text>

                <Text mt={2} fontWeight="semibold">
                  Includes:
                </Text>
                <UnorderedList spacing={2} pl={5} mt={2} color="whiteAlpha.900">
                  <ListItem>Flower decoration</ListItem>
                  <ListItem>Soloist singer</ListItem>
                  <ListItem>Ushers and altar servers</ListItem>
                  <ListItem>Priest celebrant</ListItem>
                  <ListItem>Wedding chairs with kneeler</ListItem>
                  <ListItem>Sound system (4 microphones)</ListItem>
                  <ListItem>Big ceiling fans</ListItem>
                  <ListItem>Registration of Marriage Contract</ListItem>
                </UnorderedList>

                <Divider my={5} borderColor="whiteAlpha.400" />
                <Text fontWeight="semibold">Additional Fees</Text>
                <Text color="whiteAlpha.900">₱1,000 per additional sponsor pair (beyond 6 pairs)</Text>
              </Box>
            </Grid>
          </Box>

          <Box>
            <Stack spacing={4} textAlign="center" mb={{ base: 8, md: 10 }}>
              <HStack justify="center" spacing={2}>
                <Users size={20} />
                <Heading size={{ base: "lg", md: "xl" }}>Wedding Entourage</Heading>
              </HStack>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                A standard seating arrangement and the usual entourage groups.
              </Text>
            </Stack>

            <Box position="relative" borderRadius="2xl" overflow="hidden" minH={{ base: 320, md: 460 }}>
              <Image
                src={seatingArrangementImage}
                alt="Wedding entourage seating arrangement"
                fill
                sizes="100vw"
                style={{ objectFit: "contain", background: "white" }}
              />
              <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.700, transparent)" />
              <Box position="absolute" left={0} right={0} bottom={0} p={{ base: 5, md: 6 }}>
                <Heading size="md" color="white">
                  Standard Seating Arrangement
                </Heading>
                <Text color="whiteAlpha.900">Traditional layout for your wedding ceremony</Text>
              </Box>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={{ base: 6, md: 8 }}>
              <Box
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="2xl"
                p={{ base: 5, md: 6 }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Heading size="sm" mb={3}>
                  Principal Participants
                </Heading>
                <UnorderedList spacing={2} pl={5} color="gray.700" _dark={{ color: "gray.200" }}>
                  <ListItem>Bride & Groom</ListItem>
                  <ListItem>Parents of the Bride & Groom</ListItem>
                  <ListItem>Maid of Honor & Best Man</ListItem>
                </UnorderedList>
              </Box>

              <Box
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="2xl"
                p={{ base: 5, md: 6 }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Heading size="sm" mb={3}>
                  Wedding Party
                </Heading>
                <UnorderedList spacing={2} pl={5} color="gray.700" _dark={{ color: "gray.200" }}>
                  <ListItem>Bridesmaids & Groomsmen</ListItem>
                  <ListItem>Flower Girls</ListItem>
                  <ListItem>Ring Bearer</ListItem>
                  <ListItem>Coin Bearer</ListItem>
                </UnorderedList>
              </Box>

              <Box
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="2xl"
                p={{ base: 5, md: 6 }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Heading size="sm" mb={3}>
                  Secondary Sponsors
                </Heading>
                <UnorderedList spacing={2} pl={5} color="gray.700" _dark={{ color: "gray.200" }}>
                  <ListItem>Candle Sponsors</ListItem>
                  <ListItem>Veil Sponsors</ListItem>
                  <ListItem>Cord Sponsors</ListItem>
                  <ListItem>Principal Sponsors (Ninongs & Ninangs)</ListItem>
                </UnorderedList>
              </Box>
            </SimpleGrid>
          </Box>

          <Box>
            <Stack spacing={4} textAlign="center" mb={{ base: 8, md: 10 }}>
              <HStack justify="center" spacing={2}>
                <Phone size={20} />
                <Heading size={{ base: "lg", md: "xl" }}>Contact Information</Heading>
              </HStack>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                For reservations and clarification, please contact the parish office or the wedding coordinator.
              </Text>
            </Stack>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} alignItems="start">
              <Box
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="2xl"
                p={{ base: 6, md: 8 }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Heading size="md" mb={3}>
                  Parish Office
                </Heading>
                <Stack spacing={2} color="gray.700" _dark={{ color: "gray.200" }}>
                  <Text>{contactInfo.parishOffice.address}</Text>
                  <Text>
                    Tel no.:{" "}
                    <Link as={NextLink} href={`tel:${siteConfig.contact.phone}`} color="brand.700" _dark={{ color: "brand.200" }}>
                      {siteConfig.contact.phone}
                    </Link>
                  </Text>
                  <Text>Office Hours: {contactInfo.parishOffice.hours}</Text>
                  <Text>
                    Email:{" "}
                    <Link
                      as={NextLink}
                      href={`mailto:${siteConfig.contact.email}`}
                      color="brand.700"
                      _dark={{ color: "brand.200" }}
                    >
                      {siteConfig.contact.email}
                    </Link>
                  </Text>
                </Stack>
              </Box>

              <Box
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="2xl"
                p={{ base: 6, md: 8 }}
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Heading size="md" mb={3}>
                  Church Wedding Coordinator
                </Heading>
                <Stack spacing={2} color="gray.700" _dark={{ color: "gray.200" }}>
                  <Text>{contactInfo.weddingCoordinator.name}</Text>
                  <Text>
                    <Link as={NextLink} href={`tel:${contactInfo.weddingCoordinator.phone}`} color="brand.700" _dark={{ color: "brand.200" }}>
                      {contactInfo.weddingCoordinator.phone}
                    </Link>
                  </Text>
                  <Text>
                    Facebook:{" "}
                    <Link href={contactInfo.weddingCoordinator.facebookUrl} color="brand.700" _dark={{ color: "brand.200" }} isExternal>
                      {contactInfo.weddingCoordinator.facebookLabel}
                    </Link>
                  </Text>
                </Stack>
              </Box>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
