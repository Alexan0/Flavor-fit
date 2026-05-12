import type { GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  recipe?: GetRecipeBySlugQuery["recipeBySlug"];
}

export function RecipeContentDescription({ recipe }: Props) {
  return (
    <div className="mt-6">
      <span className="font-semibold">Description:</span>
      <p className="mt-1 text-sm opacity-60">{recipe?.description}</p>
      <div className="mt-1 flex flex-wrap items-center gap-1">
        {recipe?.tags?.map((tag) => (
          <span key={tag.id} className="text-primary text-sm font-semibold">
            #{tag.name}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="font-semibold">{recipe?.nutritionFacts?.carbohydrates}g</span>
          <span className="text-sm opacity-70">Carbohydrates</span>
        </div>

        <span className="font-bold">&middot;</span>

        <div className="flex items-center gap-1">
          <span className="font-semibold">{recipe?.nutritionFacts?.proteins}g</span>
          <span className="text-sm opacity-70">Proteins</span>
        </div>

        <span className="font-bold">&middot;</span>

        <div className="flex items-center gap-1">
          <span className="font-semibold">{recipe?.nutritionFacts?.fats}g</span>
          <span className="text-sm opacity-70">Fats</span>
        </div>

        <span className="font-bold">&middot;</span>

        <div className="flex items-center gap-1">
          <span className="font-semibold">{recipe?.nutritionFacts?.fiber}g</span>
          <span className="text-sm opacity-70">Fiber</span>
        </div>
      </div>
    </div>
  );
}
