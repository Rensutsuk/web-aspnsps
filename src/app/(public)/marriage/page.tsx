import type { Metadata } from "next";

import { MarriagePage } from "@/components/marriage/MarriagePage";

export const metadata: Metadata = {
  title: "Marriage",
};

export default function MarriageRoute() {
  return <MarriagePage />;
}

