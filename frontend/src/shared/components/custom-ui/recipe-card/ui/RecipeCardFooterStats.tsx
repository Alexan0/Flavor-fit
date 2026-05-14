import { Eye, Heart } from "lucide-react";

import { formatCompactNumber } from "@/shared/utils/format-compact-number.utils";

import { recipeCardFooterTextVariants } from "../styles/recipe-card.styles";
import type { TRecipeCardSize } from "../types/recipe-card.types";

interface Props {
  likes?: number | null;
  views?: number;
  size?: TRecipeCardSize;
}

export function RecipeCardFooterStats({ likes, views, size = "default" }: Props) {
  const iconSize = size === "sm" ? "size-3.5" : "size-4";

  return (
    <>
      <div className={recipeCardFooterTextVariants({ size })}>
        <Heart className={iconSize} />
        <span>{formatCompactNumber(likes)}</span>
      </div>
      <div className={recipeCardFooterTextVariants({ size })}>
        <Eye className={iconSize} />
        <span>{formatCompactNumber(views)}</span>
      </div>
    </>
  );
}
