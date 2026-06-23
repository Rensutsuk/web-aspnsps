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
import { notFound, redirect } from "next/navigation";
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

async function updatePost(slug: string, formData: FormData) {
  "use server";

  await requireBlogManager();

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const featuredImageUrl = String(formData.get("featuredImage") ?? "").trim() || null;
  const dateRaw = String(formData.get("date") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!slug || !title || !author || !content) {
    redirect(`/admin/blogs/${slug}/edit`);
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

  await prisma.blogPost.update({
    where: { slug },
    data: {
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

type EditBlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  await requireBlogManager();
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      slug: true,
      title: true,
      author: true,
      excerpt: true,
      content: true,
      featuredImage: true,
      date: true,
      published: true,
    },
  });

  if (!post) {
    notFound();
  }

  const action = updatePost.bind(null, post.slug);

  return (
    <AdminShell title="Edit Blog Post" description={`Update content for ${post.slug}.`}>
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
              <Input name="title" defaultValue={post.title} />
            </FormControl>
          </GridItem>

          <FormControl isReadOnly>
            <FormLabel>Slug</FormLabel>
            <Input value={post.slug} readOnly />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Author</FormLabel>
            <Input name="author" defaultValue={post.author} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Publish Date</FormLabel>
            <Input name="date" type="date" defaultValue={post.date.toISOString().slice(0, 10)} />
          </FormControl>

          <FormControl>
            <FormLabel>Featured Image URL</FormLabel>
            <Input name="featuredImage" type="url" defaultValue={post.featuredImage ?? ""} placeholder="https://..." />
          </FormControl>

          <FormControl>
            <FormLabel>Featured Image File</FormLabel>
            <Input name="featuredImageFile" type="file" accept="image/*" />
          </FormControl>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl>
              <FormLabel>Excerpt</FormLabel>
              <Textarea name="excerpt" rows={4} defaultValue={post.excerpt} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl isRequired>
              <FormLabel>Content (Markdown)</FormLabel>
              <Textarea name="content" rows={18} fontFamily="mono" defaultValue={post.content} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }}>
              <FormControl display="flex" alignItems="center" gap={3}>
                <FormLabel mb="0">Published</FormLabel>
                <Switch name="published" defaultChecked={post.published} colorScheme="brand" />
              </FormControl>

              <Stack direction="row">
                <Button as="a" href={`/blog/${post.slug}`} variant="outline">
                  View Post
                </Button>
                <Button as="a" href="/admin/blogs" variant="ghost">
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

      <Box borderWidth="1px" borderRadius="2xl" p={5} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
        <Text fontWeight="semibold">Editing notes</Text>
        <Text mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
          Slugs stay fixed after creation to keep links stable. Update the title, excerpt, body, and publish state here.
        </Text>
      </Box>
    </AdminShell>
  );
}
