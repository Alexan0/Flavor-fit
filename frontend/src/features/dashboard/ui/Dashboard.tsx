"use client";

import { useQuery } from "@apollo/client/react";

import { RecipeVerticalCard } from "./recipe-vertical-card/RecipeVerticalCard";
import { RecipeVerticalCardSkeleton } from "./recipe-vertical-card/RecipeVerticalCardSkeleton";
import { DashboardTopSide } from "./DashboardTopSide";

import { GetRandomRecipeDocument } from "@/__generated__/graphql";

export function Dashboard() {
  const { data: randomRecipe, loading } = useQuery(GetRandomRecipeDocument);

  return (
    <main className="grid h-full grid-cols-[4.5fr_1fr] gap-5">
      <div>
        <DashboardTopSide />
      </div>

      {loading ? <RecipeVerticalCardSkeleton /> : <RecipeVerticalCard recipe={randomRecipe?.randomRecipe} />}
    </main>
  );
}
