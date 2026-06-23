import type { Metadata } from "next";

import { MassSchedulePage } from "@/components/schedule/MassSchedulePage";

export const metadata: Metadata = {
  title: "Mass Schedule",
};

export default function SchedulePage() {
  return <MassSchedulePage />;
}

