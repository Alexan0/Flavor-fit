import { Clock4, Flame } from "lucide-react";

import { capitalizeFirstLetter } from "@/shared/utils/capitalizeFirstLetter.utils";

import type { TRecipeCardSize } from "../../types/recipe-card.types";

import { RecipeCardBadge } from "./RecipeCardBadge";

import type { GetRecipesQuery } from "@/__generated__/graphql";

interface Props {
  recipe: GetRecipesQuery["recipes"]["items"][number];
  size: TRecipeCardSize;
}

export function RecipeCardMetaBadges({ recipe, size }: Props) {
  return (
    <div className="mt-2 flex items-center gap-1">
      <RecipeCardBadge size={size}>{capitalizeFirstLetter(recipe.mealType)}</RecipeCardBadge>
      <RecipeCardBadge Icon={Flame} size={size}>
        {recipe.calories}kcal
      </RecipeCardBadge>
      <RecipeCardBadge Icon={Clock4} size={size}>
        {recipe.cookingTime} mins
      </RecipeCardBadge>
    </div>
  );
}
