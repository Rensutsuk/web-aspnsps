import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getBootstrapStatus, getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const currentAdmin = await getCurrentAdmin();
  if (currentAdmin) {
    redirect("/admin");
  }

  const params = await searchParams;
  const bootstrap = await getBootstrapStatus();

  return (
    <Box minH="100dvh" bg="gray.50" _dark={{ bg: "gray.900" }} display="flex" alignItems="center" py={10}>
      <Container maxW="lg">
        <Stack spacing={6}>
          <Stack spacing={2} textAlign="center">
            <Heading size="xl">Admin Sign In</Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Sign in with an internal administrator or editor account to manage parish blog content.
            </Text>
          </Stack>

          {!bootstrap.hasSysAdmin && !bootstrap.isEnvConfigured ? (
            <Box borderWidth="1px" borderRadius="2xl" p={5} bg="orange.50" borderColor="orange.200" _dark={{ bg: "orange.900", borderColor: "orange.700" }}>
              <Text fontWeight="semibold">No bootstrap administrator is configured yet.</Text>
              <Text mt={2} color="gray.700" _dark={{ color: "gray.200" }}>
                Set `SYSADMIN_EMAIL` and `SYSADMIN_PASSWORD`, or use `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD`, then reload this page.
              </Text>
            </Box>
          ) : null}

          <Box borderWidth="1px" borderRadius="3xl" p={{ base: 5, md: 8 }} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.700" }}>
            <AdminLoginForm showCredentialsError={params.error === "credentials"} />
          </Box>

          <Button as="a" href="/" variant="ghost" alignSelf="center">
            Return to public website
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
