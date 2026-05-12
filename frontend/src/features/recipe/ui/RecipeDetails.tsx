"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";

import { Breadcrumbs } from "@/shared/components/custom-ui/breadcrumbs/Breadcrumbs";
import { PAGES } from "@/shared/config/page.config";

import { RecipeContent } from "./recipe-content/RecipeContent";
import { RecipeComments } from "./RecipeComments";
import { RecipeSkeleton } from "./RecipeSkeleton";

import { GetRecipeBySlugDocument } from "@/__generated__/graphql";

export function RecipeDetails() {
  const params = useParams();

  const { data: recipe, loading } = useQuery(GetRecipeBySlugDocument, {
    variables: {
      slug: params.slug?.toString() || ""
    }
  });

  if (loading) {
    return <RecipeSkeleton />;
  }

  return (
    <>
      <Breadcrumbs title={recipe?.recipeBySlug.title} href={PAGES.RECIPES} />
      <div className="grid h-[calc(100%-44px)] grid-cols-[3.5fr_1fr] gap-5">
        <RecipeContent recipe={recipe?.recipeBySlug} />
        <RecipeComments />
      </div>
    </>
  );
}
