import { Box } from "@chakra-ui/react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Navbar />
      <Box
        as="main"
        minH="100dvh"
        pt={{ base: "56px", md: "64px" }}
        style={{ scrollPaddingTop: "calc(56px + env(safe-area-inset-top, 0px))" }}
      >
        {children}
        <Footer />
      </Box>
    </>
  );
}
