import type { TRecipeCardSize } from "../types/recipe-card.types";

import { RecipeCardDifficultyBadge } from "./bages/RecipeCardDifficultyBadge";
import { RecipeCardFooterStats } from "./RecipeCardFooterStats";

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
        <RecipeCardFooterStats likes={likes} views={views} size={size} />
      </div>
    </div>
  );
}
