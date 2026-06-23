import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
};

export const theme = extendTheme({
  colors,
  semanticTokens: {
    colors: {
      "app.bg": { default: "gray.50", _dark: "gray.900" },
      "app.surface": { default: "white", _dark: "gray.900" },
      "app.surfaceMuted": { default: "gray.50", _dark: "gray.800" },
      "app.border": { default: "gray.200", _dark: "gray.700" },
      "app.text": { default: "gray.900", _dark: "gray.100" },
      "app.muted": { default: "gray.700", _dark: "gray.300" },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "app.bg",
        color: "app.text",
      },
    },
  },
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
});
