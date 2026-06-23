import { HomeScrollSections } from "@/components/home/HomeScrollSections";
import { getLatestPublishedPosts } from "@/features/blog/data";

export default async function HomePage() {
  const posts = await getLatestPublishedPosts(3);

  return <HomeScrollSections posts={posts} />;
}
