"use client";

import { useQueryState } from "nuqs";

import { useDebounce } from "@/shared/hooks/useDebounce";

import { RecipesBanners } from "./recipes-banners/RecipesBanners";
import { RecipesCatalog } from "./recipes-catalog/RecipesCatalog";
import { RecipesSidebar } from "./recipes-sidebar/RecipesSidebar";

export function RecipesDashboard() {
  const [searchTerm, setSearchTerm] = useQueryState("q", { defaultValue: "" });
  const [filter, setFilter] = useQueryState("f", { defaultValue: "" });

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  return (
    <div className="flex h-full gap-6">
      <RecipesSidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filter={filter} setFilter={setFilter} />
      <main className="w-full">
        <RecipesBanners />
        <RecipesCatalog />
      </main>
    </div>
  );
}
