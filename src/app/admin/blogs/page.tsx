import {
  Badge,
  Box,
  Button,
  HStack,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { getRoleLabel, requireBlogManager } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function togglePublished(formData: FormData) {
  "use server";

  await requireBlogManager();

  const slug = String(formData.get("slug") ?? "");
  const nextPublished = String(formData.get("published") ?? "") === "true";

  if (!slug) {
    redirect("/admin/blogs");
  }

  await prisma.blogPost.update({
    where: { slug },
    data: { published: nextPublished },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

async function deletePost(formData: FormData) {
  "use server";

  await requireBlogManager();

  const slug = String(formData.get("slug") ?? "");
  if (!slug) {
    redirect("/admin/blogs");
  }

  await prisma.blogPost.delete({
    where: { slug },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export default async function AdminBlogsPage() {
  const admin = await requireBlogManager();
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      author: true,
      date: true,
      published: true,
      updatedAt: true,
    },
  });

  return (
    <AdminShell
      title="Blog Manager"
      description={`Manage public posts as ${admin.name ?? admin.email} (${getRoleLabel(admin.role)}).`}
      actions={
        <Button as="a" href="/admin/blogs/new" colorScheme="brand">
          New Post
        </Button>
      }
    >
      <Box borderWidth="1px" borderRadius="3xl" overflow="hidden" bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Updated</Th>
                <Th textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((post) => (
                <Tr key={post.id}>
                  <Td>
                    <Stack spacing={1}>
                      <Text fontWeight="semibold">{post.title}</Text>
                      <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                        {post.slug}
                      </Text>
                    </Stack>
                  </Td>
                  <Td>{post.author}</Td>
                  <Td>{post.date.toISOString().slice(0, 10)}</Td>
                  <Td>
                    <Badge colorScheme={post.published ? "green" : "gray"}>{post.published ? "Published" : "Draft"}</Badge>
                  </Td>
                  <Td>{post.updatedAt.toISOString().slice(0, 10)}</Td>
                  <Td>
                    <HStack justify="flex-end" spacing={2} flexWrap="wrap">
                      <Button as="a" href={`/blog/${post.slug}`} size="sm" variant="ghost">
                        View
                      </Button>
                      <Button as="a" href={`/admin/blogs/${post.slug}/edit`} size="sm" variant="outline">
                        Edit
                      </Button>
                      <Box as="form" action={togglePublished}>
                        <input type="hidden" name="slug" value={post.slug} />
                        <input type="hidden" name="published" value={String(!post.published)} />
                        <Button type="submit" size="sm" colorScheme="brand" variant="outline">
                          {post.published ? "Unpublish" : "Publish"}
                        </Button>
                      </Box>
                      <Box as="form" action={deletePost}>
                        <input type="hidden" name="slug" value={post.slug} />
                        <Button type="submit" size="sm" colorScheme="red" variant="outline">
                          Delete
                        </Button>
                      </Box>
                    </HStack>
                  </Td>
                </Tr>
              ))}
              {posts.length === 0 ? (
                <Tr>
                  <Td colSpan={6} py={10}>
                    <Stack spacing={2} align="center">
                      <Text fontWeight="semibold">No posts yet</Text>
                      <Button as="a" href="/admin/blogs/new" colorScheme="brand" variant="outline">
                        Create the first post
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ) : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AdminShell>
  );
}
