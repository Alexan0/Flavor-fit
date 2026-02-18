import Link from "next/link";

import { cn } from "@/shared/utils";

import type { IMenuItem } from "./nav-menu.types";

interface Props {
  menuItem: IMenuItem;
  isActive: boolean;
}

export function NavMenuItem({ isActive, menuItem }: Props) {
  return (
    <Link
      href={menuItem.href}
      className={cn(
        "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium shadow transition-colors",
        isActive ? "bg-[#1f2023] text-white" : "bg-[#e9e9e9] text-[#696969] hover:bg-gray-200"
      )}
    >
      <menuItem.icon className="size-4" aria-hidden="false" />
      {menuItem.label}
    </Link>
  );
}
