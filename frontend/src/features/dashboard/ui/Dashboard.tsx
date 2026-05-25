"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";

import { DashboardSchedule } from "./dashboard-schedule/DashboardSchedule";
import { RecipeVerticalCard } from "./recipe-vertical-card/RecipeVerticalCard";
import { RecipeVerticalCardSkeleton } from "./recipe-vertical-card/RecipeVerticalCardSkeleton";
import { DashboardBanner } from "./DashboardBanner";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { DashboardTopSide } from "./DashboardTopSide";

import { GetRandomRecipeDocument } from "@/__generated__/graphql";

export function Dashboard() {
  const [isDashboardDataLoading, setIsDashboardDataLoading] = useState(true);
  const { data: randomRecipe, loading: randomRecipeLoading } = useQuery(GetRandomRecipeDocument);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDashboardDataLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="grid h-full grid-cols-[4.5fr_1fr] gap-5">
      <div>
        <DashboardTopSide />
        <div className="mt-7 grid h-[calc(100%-88px)] grid-cols-[1fr_2.5fr] gap-6">
          {isDashboardDataLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <DashboardSchedule />
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>Report</div>
                  <div>Shopping list</div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>Daily intake</div>
                  <div>Activity</div>
                  <DashboardBanner />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {randomRecipeLoading ? (
        <RecipeVerticalCardSkeleton />
      ) : (
        <RecipeVerticalCard recipe={randomRecipe?.randomRecipe} />
      )}
    </main>
  );
}
