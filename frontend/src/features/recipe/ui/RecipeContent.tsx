import Image from "next/image";

import type { GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  recipe: GetRecipeBySlugQuery["recipeBySlug"];
}

export function RecipeContent({ recipe }: Props) {
  return (
    <div className="rounded-3xl bg-white p-4">
      <div>
        <div>
          <Image src={recipe.image} alt={recipe.title} width={400} height={400} />
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}
