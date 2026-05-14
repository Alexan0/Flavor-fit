import type { Metadata } from "next";

import { Dashboard } from "@/features/dashboard/ui/Dashboard";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Dashboard",
  ...NO_INDEX_PAGE
};

export default function Page() {
  return <Dashboard />;
}
