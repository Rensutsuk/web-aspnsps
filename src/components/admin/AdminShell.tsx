import { Box, Button, Container, HStack, Heading, Stack, Text } from "@chakra-ui/react";

import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

type AdminShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function AdminShell({ title, description, children, actions }: AdminShellProps) {
  return (
    <Box minH="100dvh" bg="gray.50" _dark={{ bg: "gray.900" }} py={{ base: 8, md: 10 }}>
      <Container maxW="7xl">
        <Stack spacing={8}>
          <HStack justify="space-between" align="flex-start" flexWrap="wrap" spacing={4}>
            <Stack spacing={2}>
              <Button as="a" href="/" alignSelf="flex-start" variant="ghost" size="sm">
                Back to site
              </Button>
              <Heading size="lg">{title}</Heading>
              <Text color="gray.600" _dark={{ color: "gray.300" }}>
                {description}
              </Text>
            </Stack>

            <HStack spacing={3} flexWrap="wrap" justify="flex-end">
              <Button as="a" href="/admin" variant="ghost">
                Dashboard
              </Button>
              <Button as="a" href="/admin/blogs" variant="ghost">
                Blog
              </Button>
              {actions}
              <AdminSignOutButton />
            </HStack>
          </HStack>

          {children}
        </Stack>
      </Container>
    </Box>
  );
}
