import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";

import { AdminShell } from "@/components/admin/AdminShell";
import { requireBlogManager } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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

function toSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function createPost(formData: FormData) {
  "use server";

  await requireBlogManager();

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const featuredImageUrl = String(formData.get("featuredImage") ?? "").trim() || null;
  const dateRaw = String(formData.get("date") ?? "").trim();
  const published = formData.get("published") === "on";
  const providedSlug = String(formData.get("slug") ?? "").trim();

  if (!title || !author || !content) {
    redirect("/admin/blogs/new");
  }

  let featuredImage = featuredImageUrl;
  const featuredImageFile = formData.get("featuredImageFile");
  if (featuredImageFile instanceof File && featuredImageFile.size > 0) {
    const utapi = new UTApi();
    const uploaded = await utapi.uploadFiles(featuredImageFile);
    const result = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    const normalized = result as unknown as UploadThingUploadResponse;
    const errorMessage = extractUploadthingError(normalized);
    if (errorMessage) {
      const message = errorMessage;
      throw new Error(message);
    }
    const url = extractUploadthingUrl(normalized);
    if (url) {
      featuredImage = url;
    }
  }

  const baseSlug = toSlug(providedSlug || title) || `post-${Date.now()}`;
  let slug = baseSlug;
  let counter = 2;

  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  await prisma.blogPost.create({
    data: {
      slug,
      title,
      author,
      excerpt: excerpt || content.slice(0, 180),
      content,
      featuredImage,
      date: dateRaw ? new Date(dateRaw) : new Date(),
      published,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export default async function NewBlogPostPage() {
  await requireBlogManager();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <AdminShell title="Create Blog Post" description="Draft and publish new announcements with the updated public blog UI.">
      <Box
        as="form"
        action={createPost}
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
              <Input name="title" />
            </FormControl>
          </GridItem>

          <FormControl>
            <FormLabel>Slug</FormLabel>
            <Input name="slug" placeholder="Auto-generated from the title" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Author</FormLabel>
            <Input name="author" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Publish Date</FormLabel>
            <Input name="date" type="date" defaultValue={today} />
          </FormControl>

          <FormControl>
            <FormLabel>Featured Image URL</FormLabel>
            <Input name="featuredImage" type="url" placeholder="https://..." />
          </FormControl>

          <FormControl>
            <FormLabel>Featured Image File</FormLabel>
            <Input name="featuredImageFile" type="file" accept="image/*" />
          </FormControl>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl>
              <FormLabel>Excerpt</FormLabel>
              <Textarea name="excerpt" rows={4} placeholder="Short summary for the card and metadata." />
            </FormControl>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl isRequired>
              <FormLabel>Content (Markdown)</FormLabel>
              <Textarea name="content" rows={18} fontFamily="mono" />
            </FormControl>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }}>
              <FormControl display="flex" alignItems="center" gap={3}>
                <FormLabel mb="0">Publish immediately</FormLabel>
                <Switch name="published" defaultChecked colorScheme="brand" />
              </FormControl>

              <Stack direction="row">
                <Button as="a" href="/admin/blogs" variant="ghost">
                  Cancel
                </Button>
                <Button type="submit" colorScheme="brand">
                  Create Post
                </Button>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      </Box>

      <Box borderWidth="1px" borderRadius="2xl" p={5} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
        <Text fontWeight="semibold">Markdown tips</Text>
        <Text mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
          Use headings, lists, blockquotes, code fences, and image URLs. The public site renders the markdown using the updated blog UI.
        </Text>
      </Box>
    </AdminShell>
  );
}
