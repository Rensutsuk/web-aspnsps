import type { Metadata } from "next";

import { MinistriesPage } from "@/components/ministries/MinistriesPage";

export const metadata: Metadata = {
  title: "Ministries",
};

export default function MinistriesRoute() {
  return <MinistriesPage />;
}

