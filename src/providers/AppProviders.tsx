"use client";

import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from "@chakra-ui/react";

import { EmotionCacheProvider } from "@/providers/EmotionCacheProvider";
import { theme } from "@/styles/theme";

type AppProvidersProps = {
  children: React.ReactNode;
  cookies?: string;
};

export function AppProviders({ children, cookies }: AppProvidersProps) {
  return (
    <EmotionCacheProvider>
      <ChakraProvider
        theme={theme}
        resetCSS
        colorModeManager={cookies ? cookieStorageManagerSSR(cookies) : localStorageManager}
      >
        {children}
      </ChakraProvider>
    </EmotionCacheProvider>
  );
}
