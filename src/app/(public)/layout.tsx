import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollContainer } from "@/components/common/SmoothScrollContainer";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Navbar />
      <SmoothScrollContainer
        mode="paged"
        showPager
        style={{
          height: "100dvh",
          overflowY: "auto",
          scrollPaddingTop: "64px",
          paddingTop: "64px",
          scrollSnapType: "y mandatory",
        }}
      >
        {children}
        <Footer />
      </SmoothScrollContainer>
    </>
  );
}
