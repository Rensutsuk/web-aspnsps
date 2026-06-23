import type { Metadata } from "next";

import { HistoryPage } from "@/components/about/HistoryPage";

export const metadata: Metadata = {
  title: "Parish History",
};

export default function AboutHistoryRoute() {
  return <HistoryPage />;
}

