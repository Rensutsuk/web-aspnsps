import { Box } from "@chakra-ui/react";

import { SmoothScrollContainer } from "@/components/common/SmoothScrollContainer";
import { HomeScrollSections } from "@/components/home/HomeScrollSections";
import { getLatestPublishedPosts } from "@/features/blog/data";

const homeContainerStyle: React.CSSProperties = {
  height: "calc(100dvh - 56px)",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  overscrollBehaviorY: "contain",
};

export default async function HomePage() {
  const posts = await getLatestPublishedPosts(3);

  return (
    <SmoothScrollContainer
      mode="paged"
      showPager
      style={homeContainerStyle}
      mdStyle={{
        height: "calc(100dvh - 64px)",
      }}
    >
      <Box>
        <HomeScrollSections posts={posts} />
      </Box>
    </SmoothScrollContainer>
  );
}


