import type { LucideIcon } from "lucide-react";

import type { ISelectItem } from "@/shared/types";

export interface ISidebarMenuAccordionItem<K extends string = string> {
  name: string;
  icon: LucideIcon;
  key: K;
  isInitialOpen?: boolean;
  children: ISelectItem[];
}
