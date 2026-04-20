"use client";

import { Search } from "lucide-react";

import { SidebarMenuAccordion } from "@/shared/components/custom-ui/sidebar-menu-accordion/SidebarMenuAccordion";
import { InputLabel } from "@/shared/components/custom-ui/with-label/InputLabel";

import { recipeSidebarMenuData } from "../data/recipes-sidebar-menu.data";
import type { TRecipeFilters } from "../types/recipes-sidebar-menu.types";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: TRecipeFilters;
  setFilters: (filters: Partial<TRecipeFilters>) => void;
}

export function RecipesSidebar({ searchTerm, setSearchTerm, filters, setFilters }: Props) {
  const setActiveFiler = (key: string, filter: string) => {
    if (filters[key as keyof typeof filters] === filter) {
      setFilters({ [key]: null });
    } else {
      setFilters({ [key]: filter });
    }
  };

  return (
    <div className="flex-[0_0_256px] space-y-6 rounded-2xl bg-white p-4">
      <InputLabel
        Icon={Search}
        placeholder="Search by recipes"
        className="bg-gray-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4 h-[calc(100%-64px)] overflow-auto rounded-2xl">
        <SidebarMenuAccordion data={recipeSidebarMenuData} values={filters} onValueChange={setActiveFiler} />
      </div>
    </div>
  );
}
