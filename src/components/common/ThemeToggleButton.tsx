"use client";

import { IconButton, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle theme"
      size="sm"
      variant="ghost"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
    />
  );
}
