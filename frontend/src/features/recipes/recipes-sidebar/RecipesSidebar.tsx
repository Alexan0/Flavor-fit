"use client";

import { Search } from "lucide-react";

import { SidebarMenuAccordion } from "@/shared/components/custom-ui/sidebar-menu-accordion/SidebarMenuAccordion";
import { InputLabel } from "@/shared/components/custom-ui/with-label/InputLabel";

import { recipeSidebarMenuData } from "./recipe-sidebar-menu.data";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

export function RecipesSidebar({ searchTerm, setSearchTerm, filter, setFilter }: Props) {
  const setActiveFiler = (filter: string) => {
    setFilter(filter);
  };

  return (
    <div className="w-full max-w-64 space-y-6 rounded-2xl bg-white p-4">
      <InputLabel
        Icon={Search}
        placeholder="Search by recipes"
        className="bg-gray-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4 h-[calc(100%-64px)] overflow-auto rounded-2xl">
        <SidebarMenuAccordion data={recipeSidebarMenuData} activeValue={filter} onValueChange={setActiveFiler} />
      </div>
    </div>
  );
}
