import {
  Badge,
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
} from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { getRoleLabel, hashPassword, requireSysAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function isValidRole(value: string): value is "SYSADMIN" | "BLOG_ADMIN" {
  return value === "SYSADMIN" || value === "BLOG_ADMIN";
}

async function createAdminUser(formData: FormData) {
  "use server";

  await requireSysAdmin();

  const name = String(formData.get("name") ?? "").trim() || null;
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "BLOG_ADMIN");

  if (!email || !password || !isValidRole(role)) {
    redirect("/admin/users?error=invalid");
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    redirect("/admin/users?error=exists");
  }

  await prisma.adminUser.create({
    data: {
      name,
      email,
      passwordHash: await hashPassword(password),
      role,
    },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users?status=created");
}

async function updateAdminUser(formData: FormData) {
  "use server";

  const currentAdmin = await requireSysAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim() || null;
  const role = String(formData.get("role") ?? "BLOG_ADMIN");
  const isActive = formData.get("isActive") === "on";
  const newPassword = String(formData.get("newPassword") ?? "");

  if (!id || !isValidRole(role)) {
    redirect("/admin/users?error=invalid");
  }

  const target = await prisma.adminUser.findUnique({
    where: { id },
    select: { id: true, role: true },
  });

  if (!target) {
    redirect("/admin/users?error=missing");
  }

  if (target.id === currentAdmin.id && (!isActive || role !== "SYSADMIN")) {
    redirect("/admin/users?error=self-lockout");
  }

  if (target.role === "SYSADMIN" && (!isActive || role !== "SYSADMIN")) {
    const sysAdminCount = await prisma.adminUser.count({
      where: { role: "SYSADMIN", isActive: true },
    });

    if (sysAdminCount <= 1) {
      redirect("/admin/users?error=last-sysadmin");
    }
  }

  await prisma.adminUser.update({
    where: { id },
    data: {
      name,
      role,
      isActive,
      ...(newPassword ? { passwordHash: await hashPassword(newPassword) } : {}),
    },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users?status=updated");
}

async function deleteAdminUser(formData: FormData) {
  "use server";

  const currentAdmin = await requireSysAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect("/admin/users?error=invalid");
  }

  const target = await prisma.adminUser.findUnique({
    where: { id },
    select: { id: true, role: true },
  });

  if (!target) {
    redirect("/admin/users?error=missing");
  }

  if (target.id === currentAdmin.id) {
    redirect("/admin/users?error=self-delete");
  }

  if (target.role === "SYSADMIN") {
    const sysAdminCount = await prisma.adminUser.count({
      where: { role: "SYSADMIN" },
    });

    if (sysAdminCount <= 1) {
      redirect("/admin/users?error=last-sysadmin");
    }
  }

  await prisma.adminUser.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users?status=deleted");
}

const messageMap: Record<string, { type: "success" | "error"; text: string }> = {
  created: { type: "success", text: "Account created." },
  updated: { type: "success", text: "Account updated." },
  deleted: { type: "success", text: "Account deleted." },
  invalid: { type: "error", text: "Please complete all required fields." },
  exists: { type: "error", text: "An account with that email already exists." },
  missing: { type: "error", text: "The selected account no longer exists." },
  "self-lockout": { type: "error", text: "You cannot remove your own administrator access or disable yourself." },
  "self-delete": { type: "error", text: "You cannot delete your own account." },
  "last-sysadmin": { type: "error", text: "At least one active administrator must remain." },
};

type AdminUsersPageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
  }>;
};

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const currentAdmin = await requireSysAdmin();
  const params = await searchParams;
  const feedback = messageMap[params.error ?? params.status ?? ""];

  const admins = await prisma.adminUser.findMany({
    orderBy: [{ role: "asc" }, { email: "asc" }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <AdminShell title="Admin And Editor Accounts" description={`Manage internal accounts as ${currentAdmin.name ?? currentAdmin.email}.`}>
      {feedback ? (
        <Box borderWidth="1px" borderRadius="2xl" p={4} bg={feedback.type === "success" ? "green.50" : "red.50"} borderColor={feedback.type === "success" ? "green.200" : "red.200"} _dark={{ bg: feedback.type === "success" ? "green.900" : "red.900", borderColor: feedback.type === "success" ? "green.700" : "red.700" }}>
          <Text>{feedback.text}</Text>
        </Box>
      ) : null}

      <Box borderWidth="1px" borderRadius="3xl" p={{ base: 5, md: 8 }} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
        <Text fontSize="lg" fontWeight="semibold" mb={5}>
          Create Account
        </Text>
        <Box as="form" action={createAdminUser}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" placeholder="Optional display name" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Temporary Password</FormLabel>
              <Input name="password" type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select name="role" defaultValue="BLOG_ADMIN">
                <option value="BLOG_ADMIN">Editor</option>
                <option value="SYSADMIN">Administrator</option>
              </Select>
            </FormControl>
            <GridItem colSpan={{ base: 1, md: 4 }}>
              <Button type="submit" colorScheme="brand">
                Create Account
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Stack spacing={5}>
        {admins.map((admin) => (
          <Box key={admin.id} borderWidth="1px" borderRadius="3xl" p={{ base: 5, md: 8 }} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
            <Stack spacing={5}>
              <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }}>
                <Stack spacing={1}>
                  <Text fontSize="lg" fontWeight="semibold">
                    {admin.name || admin.email}
                  </Text>
                  <Text color="gray.600" _dark={{ color: "gray.300" }}>
                    {admin.email}
                  </Text>
                  <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
                    Created {admin.createdAt.toISOString().slice(0, 10)} · Updated {admin.updatedAt.toISOString().slice(0, 10)}
                  </Text>
                </Stack>
                <Badge colorScheme={admin.role === "SYSADMIN" ? "purple" : "blue"}>
                  {getRoleLabel(admin.role)}
                </Badge>
              </Stack>

              <Grid templateColumns={{ base: "1fr", md: "3fr auto" }} gap={4} alignItems="end">
                <Box as="form" action={updateAdminUser}>
                  <input type="hidden" name="id" value={admin.id} />
                  <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={5}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input name="name" defaultValue={admin.name ?? ""} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Role</FormLabel>
                      <Select name="role" defaultValue={admin.role}>
                        <option value="BLOG_ADMIN">Editor</option>
                        <option value="SYSADMIN">Administrator</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <Input name="newPassword" type="password" placeholder="Leave blank to keep current" />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" gap={3}>
                      <FormLabel mb="0">Active</FormLabel>
                      <Switch name="isActive" defaultChecked={admin.isActive} colorScheme="brand" />
                    </FormControl>
                    <GridItem colSpan={{ base: 1, md: 4 }}>
                      <Button type="submit" colorScheme="brand">
                        Save Changes
                      </Button>
                    </GridItem>
                  </Grid>
                </Box>

                <Box as="form" action={deleteAdminUser}>
                  <input type="hidden" name="id" value={admin.id} />
                  <Button type="submit" colorScheme="red" variant="outline">
                    Delete Account
                  </Button>
                </Box>
              </Grid>
            </Stack>
          </Box>
        ))}
      </Stack>
    </AdminShell>
  );
}
