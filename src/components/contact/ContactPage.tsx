"use client";

import { useMemo, useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { CalendarDays, Clock3, Mail, MapPin, Phone } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { siteConfig } from "@/lib/siteConfig";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactTopics = ["Mass intentions", "Baptism", "Marriage", "Blessing request", "Announcements", "General inquiry"];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type DetailCardProps = {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
};

function DetailCard({ icon, label, children }: DetailCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      p={5}
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    >
      <HStack align="start" spacing={4}>
        <Box
          p={3}
          borderRadius="xl"
          bg="brand.50"
          color="brand.600"
          _dark={{ bg: "brand.900", color: "brand.200" }}
        >
          <Icon as={icon} boxSize={5} />
        </Box>
        <Stack spacing={1}>
          <Text fontWeight="semibold">{label}</Text>
          {children}
        </Stack>
      </HStack>
    </Box>
  );
}

export function ContactPage() {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const officeHours = useMemo(() => siteConfig.contact.officeHours, []);

  const validate = () => {
    const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};

    if (!formState.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formState.email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!isValidEmail(formState.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!formState.subject.trim()) nextErrors.subject = "Please add a subject.";
    if (!formState.message.trim()) nextErrors.message = "Please enter your message.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status.type !== "idle") {
      setStatus({ type: "idle" });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setStatus({ type: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        data?: { message?: string };
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      setStatus({
        type: "success",
        message: result.data?.message || "Your message has been sent successfully.",
      });
      setFormState(initialFormState);
      setErrors({});
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send your message right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box pb={{ base: 10, md: 12 }}>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        description="Reach the parish office for inquiries, announcements, sacramental concerns, and pastoral support. You may call, email, visit, or send a message through the form."
        backgroundImageSrc="/img/about/church-building.jpg"
        backgroundImageAlt="ASPNSPS church building"
        actions={
          <>
            <Button as={Link} href={`tel:${siteConfig.contact.phone}`} colorScheme="brand">
              Call Parish Office
            </Button>
            <Button as={Link} href={siteConfig.contact.mapExternalUrl} isExternal variant="outline" color="white" borderColor="whiteAlpha.700" _hover={{ bg: "whiteAlpha.200" }}>
              Open in Maps
            </Button>
          </>
        }
        meta={[
          {
            label: "Phone",
            value: (
              <Link href={`tel:${siteConfig.contact.phone}`} fontWeight="semibold" color="white">
                {siteConfig.contact.phone}
              </Link>
            ),
          },
          {
            label: "Email",
            value: (
              <Link href={`mailto:${siteConfig.contact.email}`} fontWeight="semibold" color="white">
                {siteConfig.contact.email}
              </Link>
            ),
          },
          {
            label: "Office Days",
            value: officeHours[0]?.label || "Contact parish office",
          },
        ]}
      />

      <Container maxW="6xl" mt={{ base: 8, md: 10 }}>
        <Grid templateColumns={{ base: "1fr", lg: "0.95fr 1.05fr" }} gap={{ base: 8, md: 10 }}>
          <Stack spacing={6}>
            <DetailCard icon={Phone} label="Phone">
              <Link href={`tel:${siteConfig.contact.phone}`} color="brand.600" _dark={{ color: "brand.200" }}>
                {siteConfig.contact.phone}
              </Link>
            </DetailCard>

            <DetailCard icon={Mail} label="Email">
              <Link href={`mailto:${siteConfig.contact.email}`} color="brand.600" _dark={{ color: "brand.200" }}>
                {siteConfig.contact.email}
              </Link>
            </DetailCard>

            <DetailCard icon={MapPin} label="Address">
              <Text>{siteConfig.contact.address.line1}</Text>
              <Text>{siteConfig.contact.address.line2}</Text>
              <Link href={siteConfig.contact.mapExternalUrl} isExternal color="brand.600" _dark={{ color: "brand.200" }}>
                View on Google Maps
              </Link>
            </DetailCard>

            <Box
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="2xl"
              p={6}
              bg="white"
              _dark={{ bg: "gray.900", borderColor: "gray.700" }}
            >
              <HStack spacing={3} mb={4}>
                <Icon as={CalendarDays} boxSize={5} color="brand.500" />
                <Heading size="md">Office Hours</Heading>
              </HStack>

              <Stack spacing={4}>
                {officeHours.map((entry) => (
                  <Box
                    key={entry.label}
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="xl"
                    p={4}
                    _dark={{ borderColor: "gray.700" }}
                  >
                    <HStack justify="space-between" align="start" mb={3} flexWrap="wrap">
                      <Stack spacing={0.5}>
                        <Text fontWeight="semibold">{entry.label}</Text>
                      </Stack>
                      <Badge colorScheme={entry.badge === "Closed" ? "red" : "brand"} borderRadius="full" px={3} py={1}>
                        {entry.badge}
                      </Badge>
                    </HStack>
                    <Stack spacing={2}>
                      {entry.slots.map((slot) => (
                        <HStack key={slot} spacing={2} align="start">
                          <Icon as={Clock3} boxSize={4} mt={0.5} color="gray.500" _dark={{ color: "gray.300" }} />
                          <Text color="gray.600" _dark={{ color: "gray.300" }}>
                            {slot}
                          </Text>
                        </HStack>
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>

          <Stack spacing={6}>
            <Box
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              bg="white"
              _dark={{ bg: "gray.900", borderColor: "gray.700" }}
            >
              <Box as="form" onSubmit={handleSubmit}>
                <Stack spacing={5}>
                <Stack spacing={1}>
                  <Heading size="md">Send us a Message</Heading>
                  <Text color="gray.600" _dark={{ color: "gray.300" }}>
                    We usually respond during parish office hours. Please provide enough detail so we can direct your
                    inquiry properly.
                  </Text>
                </Stack>

                {status.type !== "idle" ? (
                  <Alert status={status.type === "success" ? "success" : "error"} borderRadius="xl">
                    <AlertIcon />
                    <AlertDescription>{status.message}</AlertDescription>
                  </Alert>
                ) : null}

                <Stack spacing={1.5}>
                  <Text fontWeight="medium">Name</Text>
                  <Input
                    name="name"
                    autoComplete="name"
                    value={formState.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    placeholder="Type your name here"
                    isInvalid={Boolean(errors.name)}
                    required
                  />
                  {errors.name ? <Text fontSize="sm" color="red.500">{errors.name}</Text> : null}
                </Stack>

                <Stack spacing={1.5}>
                  <Text fontWeight="medium">Email</Text>
                  <Input
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={formState.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    placeholder="your.email@example.com"
                    isInvalid={Boolean(errors.email)}
                    required
                  />
                  {errors.email ? <Text fontSize="sm" color="red.500">{errors.email}</Text> : null}
                </Stack>

                <Stack spacing={2}>
                  <Text fontWeight="medium">Common inquiries</Text>
                  <Wrap spacing={2}>
                    {contactTopics.map((topic) => (
                      <WrapItem key={topic}>
                        <Button type="button" size="sm" variant="outline" onClick={() => handleChange("subject", topic)}>
                          {topic}
                        </Button>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Stack>

                <Stack spacing={1.5}>
                  <Text fontWeight="medium">Subject</Text>
                  <Input
                    name="subject"
                    value={formState.subject}
                    onChange={(event) => handleChange("subject", event.target.value)}
                    placeholder="What is your inquiry about?"
                    isInvalid={Boolean(errors.subject)}
                    required
                  />
                  {errors.subject ? <Text fontSize="sm" color="red.500">{errors.subject}</Text> : null}
                </Stack>

                <Stack spacing={1.5}>
                  <Text fontWeight="medium">Message</Text>
                  <Textarea
                    name="message"
                    autoComplete="off"
                    minH="180px"
                    value={formState.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    placeholder="Write your message here..."
                    isInvalid={Boolean(errors.message)}
                    required
                  />
                  {errors.message ? <Text fontSize="sm" color="red.500">{errors.message}</Text> : null}
                </Stack>

                <Button type="submit" colorScheme="brand" isLoading={isSubmitting} loadingText="Sending">
                  Send Message
                </Button>

                <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                  For urgent matters, call the parish office at{" "}
                  <Link href={`tel:${siteConfig.contact.phone}`} color="brand.600" _dark={{ color: "brand.200" }}>
                    {siteConfig.contact.phone}
                  </Link>
                  .
                </Text>
                </Stack>
              </Box>
            </Box>

            <Box
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="2xl"
              overflow="hidden"
              bg="white"
              _dark={{ bg: "gray.900", borderColor: "gray.700" }}
            >
              <Box p={5} borderBottomWidth="1px" borderColor="gray.200" _dark={{ borderColor: "gray.700" }}>
                <Heading size="md">Visit the Parish</Heading>
                <Text mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                  Find the church easily through the embedded map below.
                </Text>
              </Box>
              <Box h={{ base: "320px", md: "420px" }}>
                <iframe
                  src={siteConfig.contact.mapEmbedUrl}
                  title={`${siteConfig.parishNameShort} map location`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}
