import { ChefHat, Eye, Heart } from "lucide-react";

import { formatCompactNumber } from "@/shared/utils/format-compact-number.utils";

import { recipeCardDifficultyBadgeVariants, recipeCardFooterTextVariants } from "../styles/recipe-card.styles";
import type { TRecipeCardSize } from "../types/recipe-card.types";

import { Difficulty } from "@/__generated__/graphql";

interface Props {
  views?: number;
  likes?: number | null;
  difficultyLevel?: Difficulty;
  size: TRecipeCardSize;
}

export function RecipeCardFooter({ views, likes, difficultyLevel, size }: Props) {
  const hatCount = Difficulty.Easy === difficultyLevel ? 1 : difficultyLevel === Difficulty.Medium ? 2 : 3;

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className={recipeCardDifficultyBadgeVariants({ tone: difficultyLevel, size })}>
        <span className="flex items-center gap-0.5">
          {Array.from({ length: hatCount }).map((_, index) => (
            <ChefHat key={index} className="size-3.5" />
          ))}
          {size !== "sm" && <span className="capitalize">{difficultyLevel}</span>}
        </span>
      </div>
      <div className="flex items-center gap-4">
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
