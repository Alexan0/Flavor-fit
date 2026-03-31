import { ChevronDown, CornerDownRight } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { cn } from "@/shared/utils";

import type { ISidebarMenuAccordionItem } from "./sidebar-menu-accordion.types";

interface Props {
  item: ISidebarMenuAccordionItem;
  activeValue?: string;
  onValueChange?: (value: string) => void;
}

export function MenuAccordionItem({ item, activeValue, onValueChange }: Props) {
  return (
    <Collapsible defaultOpen={item.isInitialOpen}>
      <CollapsibleTrigger
        className={cn("group flex w-full items-center justify-between rounded-xl px-2 py-1.5 opacity-80", {
          "bg-accent": item.children.some((child) => child.value === activeValue)
        })}
      >
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          <item.icon size={22} />
          {item.name}
        </span>
        <ChevronDown
          size={20}
          className="transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="space-y-1 pt-2 pl-4">
          {item.children.map((child) => (
            <li key={child.value}>
              <button className="flex w-full items-center justify-between" onClick={() => onValueChange?.(child.value)}>
                <span
                  className={cn("flex items-center gap-1.5 opacity-50", {
                    "opacity-100": activeValue === child.value
                  })}
                >
                  <CornerDownRight size={16} />
                  <span>{child.label}</span>
                </span>

                {!!child.badgeValue && (
                  <span className="rounded-xl bg-red-100 px-1.5 py-0.5 text-xs text-red-400">{child.badgeValue}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
