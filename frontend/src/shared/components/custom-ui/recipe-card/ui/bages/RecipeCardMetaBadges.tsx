import { Clock4 } from "lucide-react";

import type { TRecipeCardSize } from "../../types/recipe-card.types";

import { RecipeCardBadge } from "./RecipeCardBadge";

import type { GetRecipesQuery } from "@/__generated__/graphql";

interface Props {
  recipe: GetRecipesQuery["recipes"][number];
  size: TRecipeCardSize;
}

export function RecipeCardMetaBadges({ recipe, size }: Props) {
  return (
    <div className="mt-2 flex items-center gap-1">
      <RecipeCardBadge size={size}>Main dish</RecipeCardBadge>
      <RecipeCardBadge size={size}>{recipe.calories}kcal</RecipeCardBadge>
      <RecipeCardBadge Icon={Clock4} size={size}>
        {recipe.cookingTime} mins
      </RecipeCardBadge>
    </div>
  );
}
