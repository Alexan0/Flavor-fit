import { Eye, Heart } from "lucide-react";

import { formatCompactNumber } from "@/shared/utils/format-compact-number.utils";

import { recipeCardFooterTextVariants } from "../styles/recipe-card.styles";
import type { TRecipeCardSize } from "../types/recipe-card.types";

import { RecipeCardDifficultyBadge } from "./bages/RecipeCardDifficultyBadge";

import { Difficulty } from "@/__generated__/graphql";

interface Props {
  views?: number;
  likes?: number | null;
  difficultyLevel?: Difficulty;
  size: TRecipeCardSize;
}

export function RecipeCardFooter({ views, likes, difficultyLevel, size }: Props) {
  return (
    <div className="mt-2.5 flex items-center justify-between">
      <RecipeCardDifficultyBadge size={size} difficultyLevel={difficultyLevel} />
      <div className="flex items-center gap-2">
        <div className={recipeCardFooterTextVariants({ size })}>
          <Heart className={size === "sm" ? "size-3.5" : "size-4"} />
          <span className="capitalize">{formatCompactNumber(likes)}</span>
        </div>
        <div className={recipeCardFooterTextVariants({ size })}>
          <Eye className={size === "sm" ? "size-3.5" : "size-4"} />
          <span className="capitalize">{formatCompactNumber(views)}</span>
        </div>
      </div>
    </div>
  );
}
