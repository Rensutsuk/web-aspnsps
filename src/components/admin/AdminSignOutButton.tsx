"use client";

import { Button } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function AdminSignOutButton() {
  return (
    <Button
      variant="outline"
      leftIcon={<LogOut size={16} />}
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      Sign Out
    </Button>
  );
}
