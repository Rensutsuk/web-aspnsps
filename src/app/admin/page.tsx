import { Box, Button, SimpleGrid, Stat, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";

import { AdminShell } from "@/components/admin/AdminShell";
import { getRoleLabel, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();

  const [totalPosts, publishedPosts, draftPosts, totalEvents, publishedEvents, draftEvents, totalAdmins] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
    prisma.event.count(),
    prisma.event.count({ where: { published: true } }),
    prisma.event.count({ where: { published: false } }),
    prisma.adminUser.count({ where: { isActive: true } }),
  ]);

  return (
    <AdminShell
      title="Admin Dashboard"
      description={`Signed in as ${admin.name ?? admin.email} (${getRoleLabel(admin.role)}).`}
      actions={
        admin.role === "SYSADMIN" ? (
          <Button as="a" href="/admin/users" colorScheme="brand" variant="outline">
            Manage Accounts
          </Button>
        ) : null
      }
    >
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5}>
        <StatCard label="Total Posts" value={String(totalPosts)} help="All draft and published articles" />
        <StatCard label="Published" value={String(publishedPosts)} help="Visible on the public website" />
        <StatCard label="Drafts" value={String(draftPosts)} help="Saved but not publicly visible" />
        <StatCard label="Total Events" value={String(totalEvents)} help="All scheduled events" />
        <StatCard label="Published Events" value={String(publishedEvents)} help="Visible on /events and iCal feed" />
        <StatCard label="Draft Events" value={String(draftEvents)} help="Hidden from the public website" />
        <StatCard label="Active Accounts" value={String(totalAdmins)} help="Administrators and editors" />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        <ActionCard
          title="Manage Blog Posts"
          description="Create announcements, update reflections, publish drafts, and review the public article archive."
          href="/admin/blogs"
          actionLabel="Open Blog Manager"
        />
        <ActionCard
          title="Manage Events"
          description="Create and publish event pages, link optional blog posts, and export iCal feeds for the public calendar."
          href="/admin/events"
          actionLabel="Open Events Manager"
        />
        <ActionCard
          title={admin.role === "SYSADMIN" ? "Manage Admin And Editor Accounts" : "Role Permissions"}
          description={
            admin.role === "SYSADMIN"
              ? "Create editor accounts, promote administrators, disable access, and rotate passwords."
              : "Editors can manage blog content. Account creation and permission changes are restricted to administrators."
          }
          href={admin.role === "SYSADMIN" ? "/admin/users" : "/admin/blogs"}
          actionLabel={admin.role === "SYSADMIN" ? "Open Account Manager" : "Continue To Blog Manager"}
        />
      </SimpleGrid>
    </AdminShell>
  );
}

function StatCard({ label, value, help }: { label: string; value: string; help: string }) {
  return (
    <Box borderWidth="1px" borderRadius="2xl" p={6} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText mb={0}>{help}</StatHelpText>
      </Stat>
    </Box>
  );
}

function ActionCard({
  title,
  description,
  href,
  actionLabel,
}: {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
}) {
  return (
    <Box borderWidth="1px" borderRadius="2xl" p={6} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
      <Text fontWeight="semibold" fontSize="lg">
        {title}
      </Text>
      <Text mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
        {description}
      </Text>
      <Button as="a" href={href} mt={5} colorScheme="brand">
        {actionLabel}
      </Button>
    </Box>
  );
}
