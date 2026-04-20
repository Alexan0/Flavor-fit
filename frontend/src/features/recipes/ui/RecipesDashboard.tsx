"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { parseAsStringEnum, useQueryState, useQueryStates } from "nuqs";

import { useDebounce } from "@/shared/hooks/useDebounce";

import { useFetchMoreRecipes } from "../hooks/useFetchMoreRecipes";

import { RecipesBanners } from "./RecipesBanners";
import { RecipesCatalog } from "./RecipesCatalog";
import { RecipeCatalogSkeleton } from "./RecipesCatalogSkeleton";
import { RecipesSidebar } from "./RecipesSidebar";

import {
  Cuisine,
  DietaryPreference,
  GetRecipesDocument,
  HealthGoal,
  MealType,
  type RecipesQueryInput,
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

  const [recommendedPage, setRecommendedPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const commonInput: RecipesQueryInput = useMemo(
    () => ({ ...filters, searchTerm: debouncedSearchTerm }),
    [filters, debouncedSearchTerm]
  );

  const {
    data: recommended,
    loading: recommendedLoading,
    fetchMore: recommendedFetchMore
  } = useQuery(GetRecipesDocument, {
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        ...commonInput,
        page: recommendedPage,
        limit: 4,
        sort: "RECOMMENDED"
      }
    }
  });

  const {
    data: popular,
    loading: popularLoading,
    fetchMore: popularFetchMore
  } = useQuery(GetRecipesDocument, {
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        ...commonInput,
        page: popularPage,
        limit: 5,
        sort: "POPULAR"
      }
    }
  });

  const recommendedPagination = useFetchMoreRecipes({
    fetchMore: recommendedFetchMore,
    page: recommendedPage,
    setPage: setRecommendedPage,
    input: { ...commonInput, limit: 4 },
    sort: "RECOMMENDED",
    hasMore: recommended?.recipes.hasMore
  });

  const popularPagination = useFetchMoreRecipes({
    fetchMore: popularFetchMore,
    page: popularPage,
    setPage: setPopularPage,
    input: { ...commonInput, limit: 5 },
    sort: "POPULAR",
    hasMore: popular?.recipes.hasMore
  });

  const isInitialLoading = (recommendedLoading && !recommended) || (popularLoading && !popular);

  return (
    <div className="flex h-full gap-6">
      <RecipesSidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filters={filters} setFilters={setFilters} />
      <main className="w-full">
        <RecipesBanners />
        {isInitialLoading ? (
          <RecipeCatalogSkeleton />
        ) : (
          <RecipesCatalog
            recommended={recommended?.recipes.items || []}
            popular={popular?.recipes.items || []}
            recommendedHasMore={recommended?.recipes.hasMore}
            popularHasMore={popular?.recipes.hasMore}
            isRecommendedFetchingMore={recommendedPagination.isFetchingMore}
            isPopularFetchingMore={popularPagination.isFetchingMore}
            onLoadMoreRecommended={recommendedPagination.loadMore}
            onLoadMorePopular={popularPagination.loadMore}
          />
        )}
      </main>
    </div>
  );
}
