import Image from "next/image";

import { RecipeContentInfo } from "./RecipeContentInfo";
import { RecipeContentSteps } from "./RecipeContentSteps";

import type { GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  recipe?: GetRecipeBySlugQuery["recipeBySlug"];
}

export function RecipeContent({ recipe }: Props) {
  return (
    <div className="flex flex-col gap-6 overflow-auto rounded-3xl bg-white p-4">
      <div className="flex gap-6">
        <div className="flex-4">
          <Image
            src={recipe?.image || ""}
            alt={recipe?.title || ""}
            width={400}
            height={400}
            className="h-full w-full rounded-3xl object-cover select-none"
            draggable={false}
          />
        </div>
        <RecipeContentInfo recipe={recipe} />
      </div>
      <RecipeContentSteps steps={recipe?.recipeSteps} />
    </div>
  );
}
