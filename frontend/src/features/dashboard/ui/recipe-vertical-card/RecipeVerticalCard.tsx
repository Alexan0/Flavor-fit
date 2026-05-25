"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Clock4, Flame } from "lucide-react";

import { RecipeCardBadge } from "@/shared/components/custom-ui/recipe-card/ui/bages/RecipeCardBadge";
import { RecipeCardDifficultyBadge } from "@/shared/components/custom-ui/recipe-card/ui/bages/RecipeCardDifficultyBadge";
import { RecipeCardFooterStats } from "@/shared/components/custom-ui/recipe-card/ui/RecipeCardFooterStats";
import { RecipeIngredient } from "@/shared/components/custom-ui/recipe-ingredient/RecipeIngredient";
import { Button } from "@/shared/components/ui/button";
import { PAGES } from "@/shared/config/page.config";
import { capitalizeFirstLetter } from "@/shared/utils/capitalizeFirstLetter.utils";

import type { GetRandomRecipeQuery } from "@/__generated__/graphql";

interface Props {
  recipe?: GetRandomRecipeQuery["randomRecipe"];
}

export function RecipeVerticalCard({ recipe }: Props) {
  const { push } = useRouter();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white px-6 py-4">
      <div className="h-60">
        <Link href={PAGES.RECIPE_DETAIL(recipe?.slug)}>
          <Image
            src={recipe?.image || ""}
            alt={recipe?.title || ""}
            width={200}
            height={200}
            className="h-full w-full rounded-3xl object-cover select-none"
            draggable={false}
          />
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <Link href={PAGES.RECIPE_DETAIL(recipe?.slug)}>
          <h2 className="mt-4 text-3xl font-bold italic">{recipe?.title}</h2>
        </Link>
        <p className="mt-3 text-sm opacity-60">{recipe?.description}</p>
        <div className="mt-2 flex items-center gap-1">
          <RecipeCardBadge>{capitalizeFirstLetter(recipe?.mealType)}</RecipeCardBadge>
          <RecipeCardBadge Icon={Flame}>{recipe?.calories}kcal</RecipeCardBadge>
          <RecipeCardBadge Icon={Clock4}>{recipe?.cookingTime} mins</RecipeCardBadge>
        </div>
        <div className="mt-6">
          <span className="font-semibold">Ingredients</span>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {recipe?.recipeIngredients?.map((recipe) => (
              <RecipeIngredient
                key={recipe.ingredient.id}
                name={recipe.ingredient.name}
                iconUrl={recipe.ingredient.iconUrl}
                quantity={recipe.quantity}
                unit={recipe.unit}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <RecipeCardDifficultyBadge difficultyLevel={recipe?.difficulty} />
          <div className="flex items-center gap-2">
            <RecipeCardFooterStats likes={recipe?.likes} views={recipe?.views} />
          </div>
        </div>
      </div>
      <Button
        variant="secondary"
        className="mt-4 rounded-3xl border py-6"
        onClick={() => recipe && push(PAGES.RECIPE_DETAIL(recipe.slug))}
      >
        <span>Explore Recipe</span>
        <ArrowUpRight />
      </Button>
    </div>
  );
}
