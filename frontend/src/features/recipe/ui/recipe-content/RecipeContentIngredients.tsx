import { RecipeIngredient } from "@/shared/components/custom-ui/recipe-ingredient/RecipeIngredient";

import type { GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  recipe?: GetRecipeBySlugQuery["recipeBySlug"];
}

export function RecipeContentIngredients({ recipe }: Props) {
  return (
    <div className="mt-6">
      <span className="font-semibold">Ingredients:</span>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {recipe?.recipeIngredients?.map((recipe) => (
          <RecipeIngredient
            key={recipe.ingredient.id}
            name={recipe.ingredient.name}
            iconUrl={recipe.ingredient.iconUrl}
            quantity={recipe.quantity}
            unit={recipe.unit}
          />
        ))}
      </div>
    </div>
  );
}
