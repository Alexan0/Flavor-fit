import type { LucideIcon } from "lucide-react";

import type { ISelectItem } from "@/shared/types";

export interface ISidebarMenuAccordionItem {
  name: string;
  icon: LucideIcon;
  isInitialOpen?: boolean;
  children: ISelectItem[];
}
