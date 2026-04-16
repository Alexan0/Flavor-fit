"use client";

import { useQuery } from "@apollo/client/react";
import { parseAsStringEnum, useQueryState, useQueryStates } from "nuqs";

import { useDebounce } from "@/shared/hooks/useDebounce";

import { RecipeCatalogSkeleton } from "./RecipeCatalogSkeleton";
import { RecipesBanners } from "./RecipesBanners";
import { RecipesCatalog } from "./RecipesCatalog";
import { RecipesSidebar } from "./RecipesSidebar";

import {
  Cuisine,
  DietaryPreference,
  GetRecipesDocument,
  HealthGoal,
  MealType,
  SpecialOccasion
} from "@/__generated__/graphql";

export function RecipesDashboard() {
  const [searchTerm, setSearchTerm] = useQueryState("q", { defaultValue: "" });
  const [filters, setFilters] = useQueryStates({
    mealType: parseAsStringEnum(Object.values(MealType)),
    dietaryPreference: parseAsStringEnum(Object.values(DietaryPreference)),
    healthGoal: parseAsStringEnum(Object.values(HealthGoal)),
    cuisine: parseAsStringEnum(Object.values(Cuisine)),
    specialOccasion: parseAsStringEnum(Object.values(SpecialOccasion))
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const { data: recommended, loading: recommendedLoading } = useQuery(GetRecipesDocument, {
    variables: {
      input: {
        ...filters,
        searchTerm: debouncedSearchTerm,
        page: 1,
        limit: 10,
        sort: "RECOMMENDED"
      }
    }
  });

  const { data: popular, loading: popularLoading } = useQuery(GetRecipesDocument, {
    variables: {
      input: {
        ...filters,
        searchTerm: debouncedSearchTerm,
        page: 1,
        limit: 10,
        sort: "POPULAR"
      }
    }
  });

  return (
    <div className="flex h-full gap-6">
      <RecipesSidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filters={filters} setFilters={setFilters} />
      <main className="w-full overflow-hidden">
        <RecipesBanners />
        {recommendedLoading || popularLoading ? (
          <RecipeCatalogSkeleton />
        ) : (
          <RecipesCatalog recommended={recommended?.recipes || []} popular={popular?.recipes || []} />
        )}
      </main>
    </div>
  );
}
