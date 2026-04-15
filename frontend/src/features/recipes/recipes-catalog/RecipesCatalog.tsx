import { BookHeart, Star } from "lucide-react";

import { RecipeCarousel } from "@/features/recipes/recipe-carousel/RecipeCarousel";

import { type GetRecipesQuery } from "@/__generated__/graphql";

interface Props {
  recommended: GetRecipesQuery["recipes"];
  popular: GetRecipesQuery["recipes"];
}

export function RecipesCatalog({ recommended, popular }: Props) {
  return (
    <div className="mt-4 h-[calc(100%-155px)] overflow-auto">
      <RecipeCarousel Icon={BookHeart} title="Recommended" size="default" recipes={recommended} />
      <RecipeCarousel Icon={Star} title="Popular" size="sm" recipes={popular} />
    </div>
  );
}
