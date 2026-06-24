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
import { formatEventDateTime } from "@/features/events/utils";

export const dynamic = "force-dynamic";

async function togglePublished(formData: FormData) {
  "use server";

  await requireBlogManager();

  const slug = String(formData.get("slug") ?? "");
  const nextPublished = String(formData.get("published") ?? "") === "true";

  if (!slug) {
    redirect("/admin/events");
  }

  await prisma.event.update({
    where: { slug },
    data: { published: nextPublished },
  });

  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  revalidatePath(`/events/${slug}/ics`);
  revalidatePath("/events.ics");
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

async function deleteEvent(formData: FormData) {
  "use server";

  await requireBlogManager();

  const slug = String(formData.get("slug") ?? "");
  if (!slug) {
    redirect("/admin/events");
  }

  await prisma.event.delete({
    where: { slug },
  });

  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  revalidatePath(`/events/${slug}/ics`);
  revalidatePath("/events.ics");
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export default async function AdminEventsPage() {
  const admin = await requireBlogManager();
  const events = await prisma.event.findMany({
    orderBy: [{ startAt: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      startAt: true,
      endAt: true,
      location: true,
      published: true,
      blogPostSlug: true,
      updatedAt: true,
    },
  });

  return (
    <AdminShell
      title="Events Manager"
      description={`Manage public events as ${admin.name ?? admin.email} (${getRoleLabel(admin.role)}).`}
      actions={
        <Button as="a" href="/admin/events/new" colorScheme="brand">
          New Event
        </Button>
      }
    >
      <Box borderWidth="1px" borderRadius="3xl" overflow="hidden" bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Event</Th>
                <Th>Start</Th>
                <Th>Status</Th>
                <Th>Blog</Th>
                <Th>Updated</Th>
                <Th textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((event) => (
                <Tr key={event.id}>
                  <Td>
                    <Stack spacing={1}>
                      <Text fontWeight="semibold">{event.title}</Text>
                      <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                        {event.slug}
                      </Text>
                      {event.location ? (
                        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                          {event.location}
                        </Text>
                      ) : null}
                    </Stack>
                  </Td>
                  <Td>{formatEventDateTime(event.startAt.toISOString())}</Td>
                  <Td>
                    <Badge colorScheme={event.published ? "green" : "gray"}>{event.published ? "Published" : "Draft"}</Badge>
                  </Td>
                  <Td>
                    {event.blogPostSlug ? (
                      <Button as="a" href={`/blog/${event.blogPostSlug}`} size="sm" variant="ghost">
                        {event.blogPostSlug}
                      </Button>
                    ) : (
                      <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                        —
                      </Text>
                    )}
                  </Td>
                  <Td>{event.updatedAt.toISOString().slice(0, 10)}</Td>
                  <Td>
                    <HStack justify="flex-end" spacing={2} flexWrap="wrap">
                      <Button as="a" href={`/events/${event.slug}`} size="sm" variant="ghost">
                        View
                      </Button>
                      <Button as="a" href={`/admin/events/${event.slug}/edit`} size="sm" variant="outline">
                        Edit
                      </Button>
                      <Box as="form" action={togglePublished}>
                        <input type="hidden" name="slug" value={event.slug} />
                        <input type="hidden" name="published" value={String(!event.published)} />
                        <Button type="submit" size="sm" colorScheme="brand" variant="outline">
                          {event.published ? "Unpublish" : "Publish"}
                        </Button>
                      </Box>
                      <Box as="form" action={deleteEvent}>
                        <input type="hidden" name="slug" value={event.slug} />
                        <Button type="submit" size="sm" colorScheme="red" variant="outline">
                          Delete
                        </Button>
                      </Box>
                    </HStack>
                  </Td>
                </Tr>
              ))}
              {events.length === 0 ? (
                <Tr>
                  <Td colSpan={6} py={10}>
                    <Stack spacing={2} align="center">
                      <Text fontWeight="semibold">No events yet</Text>
                      <Button as="a" href="/admin/events/new" colorScheme="brand" variant="outline">
                        Create the first event
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
