"use client";

import { useState } from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type AdminLoginFormProps = {
  showCredentialsError: boolean;
};

export function AdminLoginForm({ showCredentialsError }: AdminLoginFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(showCredentialsError ? "Invalid email or password." : "");

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setFormError("");

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    if (result?.error) {
      setFormError("Invalid email or password.");
      setSubmitting(false);
      return;
    }

    router.push(result?.url || "/admin");
    router.refresh();
  }

  return (
    <Stack as="form" action={handleSubmit} spacing={5}>
      {formError ? (
        <Alert status="error" borderRadius="xl">
          <AlertIcon />
          {formError}
        </Alert>
      ) : null}

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input name="email" type="email" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input name="password" type="password" />
      </FormControl>

      <Button type="submit" colorScheme="brand" isLoading={submitting} loadingText="Signing in">
        Sign In
      </Button>

      <Box textAlign="center">
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          Internal accounts only
        </Text>
      </Box>
    </Stack>
  );
}
