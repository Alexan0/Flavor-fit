import { ChefHat } from "lucide-react";

import { capitalizeFirstLetter } from "@/shared/utils/capitalizeFirstLetter.utils";

import { recipeCardDifficultyBadgeVariants } from "../../styles/recipe-card.styles";
import type { TRecipeCardSize } from "../../types/recipe-card.types";

import { Difficulty } from "@/__generated__/graphql";

interface Props {
  difficultyLevel?: Difficulty;
  size?: TRecipeCardSize;
}

export function RecipeCardDifficultyBadge({ difficultyLevel, size = "default" }: Props) {
  const hatCount = Difficulty.Easy === difficultyLevel ? 1 : difficultyLevel === Difficulty.Medium ? 2 : 3;

  return (
    <div className={recipeCardDifficultyBadgeVariants({ tone: difficultyLevel, size })}>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: hatCount }).map((_, index) => (
          <ChefHat key={index} className="size-3.5" />
        ))}
        {size !== "sm" && <span>{capitalizeFirstLetter(difficultyLevel)}</span>}
      </span>
    </div>
  );
}
