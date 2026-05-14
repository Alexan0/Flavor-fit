"use client";

import { useQuery } from "@apollo/client/react";

import { DashboardTopSide } from "./DashboardTopSide";
import { RandomRecipe } from "./RandomRecipe";

import { GetRandomRecipeDocument } from "@/__generated__/graphql";

export function Dashboard() {
  const { data: randomRecipe, loading } = useQuery(GetRandomRecipeDocument);

  return (
    <main className="grid h-full grid-cols-[4.5fr_1fr] gap-5">
      <div>
        <DashboardTopSide />
      </div>

      <RandomRecipe recipe={randomRecipe?.randomRecipe} />
    </main>
  );
}
