"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";

import { Breadcrumbs } from "@/shared/components/custom-ui/breadcrumbs/Breadcrumbs";
import { PAGES } from "@/shared/config/page.config";

import { RecipeComments } from "./recipe-comments/RecipeComments";
import { RecipeContent } from "./recipe-content/RecipeContent";
import { RecipeDetailsSkeleton } from "./RecipeDetailsSkeleton";

import { GetRecipeBySlugDocument } from "@/__generated__/graphql";

export function RecipeDetails() {
  const params = useParams();

  const { data: recipe, loading } = useQuery(GetRecipeBySlugDocument, {
    variables: {
      slug: params.slug?.toString() || ""
    }
  });

  if (loading) {
    return <RecipeDetailsSkeleton />;
  }

  return (
    <>
      <Breadcrumbs title={recipe?.recipeBySlug.title} href={PAGES.RECIPES} />
      <main className="grid h-[calc(100%-44px)] grid-cols-[4.5fr_1fr] gap-5">
        <RecipeContent recipe={recipe?.recipeBySlug} />
        <RecipeComments
          comments={recipe?.recipeBySlug.comments}
          likes={recipe?.recipeBySlug.likes}
          views={recipe?.recipeBySlug.views}
          recipeId={recipe?.recipeBySlug.id}
        />
      </main>
    </>
  );
}
