import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";

import { AdminShell } from "@/components/admin/AdminShell";
import { DatePicker } from "@/components/common/DatePicker";
import { requireBlogManager } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseZonedDateTime } from "@/features/events/utils";

export const dynamic = "force-dynamic";

const DEFAULT_TIME_ZONE = "Asia/Manila";
const TIME_STEP_MINUTES = 15;

type UploadThingUploadResponse = {
  data?: {
    url?: string;
    ufsUrl?: string;
    appUrl?: string;
  };
  error?: {
    message?: string;
  };
};

function extractUploadthingUrl(response: UploadThingUploadResponse) {
  return response.data?.url || response.data?.ufsUrl || response.data?.appUrl || null;
}

function extractUploadthingError(response: UploadThingUploadResponse) {
  return response.error?.message || null;
}

function formatDateLocal(date: Date, timeZone = DEFAULT_TIME_ZONE) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function formatTimeLocal(date: Date, timeZone = DEFAULT_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const values: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  return `${values.hour}:${values.minute}`;
}

function buildTimeOptions(stepMinutes = TIME_STEP_MINUTES) {
  const options: string[] = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += stepMinutes) {
    const hour = String(Math.floor(minutes / 60)).padStart(2, "0");
    const minute = String(minutes % 60).padStart(2, "0");
    options.push(`${hour}:${minute}`);
  }
  return options;
}

async function updateEvent(slug: string, formData: FormData) {
  "use server";

  await requireBlogManager();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim() || null;
  const coverImageUrl = String(formData.get("coverImage") ?? "").trim() || null;
  const startDate = String(formData.get("startDate") ?? "").trim();
  const startTime = String(formData.get("startTime") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();
  const endTime = String(formData.get("endTime") ?? "").trim();
  const blogPostSlug = String(formData.get("blogPostSlug") ?? "").trim() || null;
  const published = formData.get("published") === "on";

  const startAtRaw = startDate && startTime ? `${startDate}T${startTime}` : "";
  const endAtRaw = endDate && endTime ? `${endDate}T${endTime}` : "";

  const startAt = parseZonedDateTime(startAtRaw);
  const endAt = endAtRaw ? parseZonedDateTime(endAtRaw) : null;

  if (!slug || !title || !description || !startAt) {
    redirect(`/admin/events/${slug}/edit`);
  }

  let coverImage = coverImageUrl;
  const coverImageFile = formData.get("coverImageFile");
  if (coverImageFile instanceof File && coverImageFile.size > 0) {
    const utapi = new UTApi();
    const uploaded = await utapi.uploadFiles(coverImageFile);
    const result = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    const normalized = result as unknown as UploadThingUploadResponse;
    const errorMessage = extractUploadthingError(normalized);
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    const url = extractUploadthingUrl(normalized);
    if (url) {
      coverImage = url;
    }
  }

  await prisma.event.update({
    where: { slug },
    data: {
      title,
      description,
      location,
      startAt,
      endAt,
      coverImage,
      blogPostSlug,
      published,
    },
  });

  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  revalidatePath(`/events/${slug}/ics`);
  revalidatePath("/events.ics");
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

type EditEventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  await requireBlogManager();
  const { slug } = await params;

  const [event, posts] = await Promise.all([
    prisma.event.findUnique({
      where: { slug },
      select: {
        slug: true,
        title: true,
        description: true,
        location: true,
        startAt: true,
        endAt: true,
        coverImage: true,
        blogPostSlug: true,
        published: true,
      },
    }),
    prisma.blogPost.findMany({
      orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
      select: { slug: true, title: true },
    }),
  ]);

  if (!event) {
    notFound();
  }

  const action = updateEvent.bind(null, event.slug);
  const timeOptions = buildTimeOptions();
  const startDateDefault = formatDateLocal(event.startAt);
  const startTimeDefault = formatTimeLocal(event.startAt);
  const endDateDefault = event.endAt ? formatDateLocal(event.endAt) : "";
  const endTimeDefault = event.endAt ? formatTimeLocal(event.endAt) : "";

  return (
    <AdminShell title="Edit Event" description={`Update event details for ${event.slug}.`}>
      <Box
        as="form"
        action={action}
        encType="multipart/form-data"
        borderWidth="1px"
        borderRadius="3xl"
        p={{ base: 5, md: 8 }}
        bg="white"
        _dark={{ bg: "gray.900", borderColor: "gray.700" }}
      >
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={5}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input name="title" defaultValue={event.title} />
            </FormControl>
          </GridItem>

          <FormControl isDisabled>
            <FormLabel>Slug</FormLabel>
            <Input value={event.slug} isReadOnly />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" defaultValue={event.location ?? ""} placeholder="Optional" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Start Date</FormLabel>
            <DatePicker name="startDate" defaultValue={startDateDefault} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Start Time</FormLabel>
            <Select name="startTime" defaultValue={startTimeDefault}>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>End Date</FormLabel>
            <DatePicker name="endDate" defaultValue={endDateDefault} placeholder="Optional" />
          </FormControl>

          <FormControl>
            <FormLabel>End Time</FormLabel>
            <Select name="endTime" defaultValue={endTimeDefault}>
              <option value="">Optional</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Cover Image URL</FormLabel>
            <Input name="coverImage" type="url" defaultValue={event.coverImage ?? ""} placeholder="https://..." />
          </FormControl>

          <FormControl>
            <FormLabel>Cover Image File</FormLabel>
            <Input name="coverImageFile" type="file" accept="image/*" />
          </FormControl>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl>
              <FormLabel>Linked Blog Post</FormLabel>
              <Select name="blogPostSlug" placeholder="None" defaultValue={event.blogPostSlug ?? ""}>
                {posts.map((post) => (
                  <option key={post.slug} value={post.slug}>
                    {post.title} ({post.slug})
                  </option>
                ))}
              </Select>
              <Text mt={2} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
                Optional: choose an existing blog post to show as a related link on the event page.
              </Text>
            </FormControl>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl isRequired>
              <FormLabel>Description (Markdown)</FormLabel>
              <Textarea name="description" rows={14} fontFamily="mono" defaultValue={event.description} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }}>
              <FormControl display="flex" alignItems="center" gap={3}>
                <FormLabel mb="0">Published</FormLabel>
                <Switch name="published" defaultChecked={event.published} colorScheme="brand" />
              </FormControl>

              <Stack direction="row">
                <Button as="a" href="/admin/events" variant="ghost">
                  Cancel
                </Button>
                <Button type="submit" colorScheme="brand">
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </AdminShell>
  );
}
