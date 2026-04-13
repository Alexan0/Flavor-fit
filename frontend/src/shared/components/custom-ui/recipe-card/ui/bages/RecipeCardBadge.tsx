import type { PropsWithChildren } from "react";
import type { LucideIcon } from "lucide-react";

import { recipeCardBadgeVariants } from "../../styles/recipe-card.styles";
import type { TRecipeCardSize } from "../../types/recipe-card.types";

interface Props extends PropsWithChildren {
  Icon?: LucideIcon;
  size: TRecipeCardSize;
}

export function RecipeCardBadge({ Icon, size, children }: Props) {
  return (
    <div className={recipeCardBadgeVariants({ size })}>
      {Icon && <Icon className={size === "sm" ? "size-3.5" : "size-4"} />}
      {children}
    </div>
  );
}
