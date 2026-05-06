"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";

import { Breadcrumbs } from "@/shared/components/custom-ui/breadcrumbs/Breadcrumbs";
import { PAGES } from "@/shared/config/page.config";

import { RecipeComments } from "./RecipeComments";
import { RecipeContent } from "./RecipeContent";
import { RecipeSkeleton } from "./RecipeSkeleton";

import { GetRecipeBySlugDocument } from "@/__generated__/graphql";

export function RecipeDetails() {
  const params = useParams();

  const { data: recipe, loading } = useQuery(GetRecipeBySlugDocument, {
    variables: {
      slug: params.id?.toString() || ""
    }
  });

  return (
    <>
      {!loading && recipe ? (
        <>
          <Breadcrumbs title={recipe?.recipeBySlug.title} href={PAGES.RECIPES} />
          <div className="grid h-[calc(100%-44px)] grid-cols-[3.5fr_1fr] gap-5">
            <RecipeContent recipe={recipe?.recipeBySlug} />
            <RecipeComments />
          </div>
        </>
      ) : (
        <RecipeSkeleton />
      )}
    </>
  );
}
