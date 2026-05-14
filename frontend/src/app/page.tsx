import { redirect } from "next/navigation";

import { PAGES } from "@/shared/config/page.config";

export default function Home() {
  return redirect(PAGES.DASHBOARD);
}
