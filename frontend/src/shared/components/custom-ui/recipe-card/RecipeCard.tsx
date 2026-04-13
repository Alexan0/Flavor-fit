import Link from "next/link";
import { EllipsisVertical } from "lucide-react";

import { PAGES } from "@/shared/config/page.config";
import { cn } from "@/shared/utils";

import {
  recipeCardDescriptionVariants,
  recipeCardTitleVariants,
  recipeCardVariants
} from "./styles/recipe-card.styles";
import type { TRecipeCardSize } from "./types/recipe-card.types";
import { RecipeCardMetaBadges } from "./ui/bages/RecipeCardMetaBadges";
import { RecipeCardFooter } from "./ui/RecipeCardFooter";
import { RecipeCardImage } from "./ui/RecipeCardImage";

import type { GetRecipesQuery } from "@/__generated__/graphql";

interface Props {
  recipe: GetRecipesQuery["recipes"][number];
  size: TRecipeCardSize;
}

export function RecipeCard({ recipe, size }: Props) {
  return (
    <div className={recipeCardVariants({ size })}>
      <RecipeCardImage image={"/images/burger.png"} name={recipe.title} size={size} slug={recipe.slug} />

      <div className="mt-4 flex items-center justify-between gap-3">
        <Link
          href={PAGES.RECIPE_DETAIL(recipe.slug)}
          className={cn(`min-w-0 flex-1 ${recipeCardTitleVariants({ size })}`)}
        >
          <h3>{recipe.title}</h3>
        </Link>

        <button
          type="button"
          className="shrink-0 text-black/40"
          aria-label="More actions"
          onClick={(e) => e.preventDefault()}
        >
          <EllipsisVertical className={size === "sm" ? "size-4" : "size-5"} />
        </button>
      </div>

      <p className={recipeCardDescriptionVariants({ size })}>{recipe.description}</p>

      <RecipeCardMetaBadges recipe={recipe} size={size} />

      <RecipeCardFooter difficultyLevel={recipe.difficulty} likes={recipe.likes} views={156100} size={size} />
    </div>
  );
}
