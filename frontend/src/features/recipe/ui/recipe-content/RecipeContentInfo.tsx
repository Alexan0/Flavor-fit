import { RecipeContentActions } from "./RecipeContentActions";
import { RecipeContentDescription } from "./RecipeContentDescription";
import { RecipeContentIngredients } from "./RecipeContentIngredients";
import { RecipeContentMeta } from "./RecipeContentMeta";

import type { GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  recipe?: GetRecipeBySlugQuery["recipeBySlug"];
}

export function RecipeContentInfo({ recipe }: Props) {
  return (
    <div className="flex-5">
      <div className="flex items-start justify-between gap-6">
        <h1 className="text-3xl font-bold italic">{recipe?.title}</h1>
        <RecipeContentActions />
      </div>

      <RecipeContentMeta recipe={recipe} />

      <RecipeContentDescription recipe={recipe} />

      <RecipeContentIngredients recipe={recipe} />
    </div>
  );
}
