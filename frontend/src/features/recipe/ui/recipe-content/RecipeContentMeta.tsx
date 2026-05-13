import Image from "next/image";
import Link from "next/link";
import { Clock4, Flame, UserPlus } from "lucide-react";

import { RecipeCardBadge } from "@/shared/components/custom-ui/recipe-card/ui/bages/RecipeCardBadge";
import { RecipeCardDifficultyBadge } from "@/shared/components/custom-ui/recipe-card/ui/bages/RecipeCardDifficultyBadge";
import { Button } from "@/shared/components/ui/button";
import { capitalizeFirstLetter } from "@/shared/utils/capitalizeFirstLetter.utils";

import type { GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  recipe?: GetRecipeBySlugQuery["recipeBySlug"];
}

export function RecipeContentMeta({ recipe }: Props) {
  return (
    <div className="mt-6 flex items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <RecipeCardBadge>{capitalizeFirstLetter(recipe?.mealType)}</RecipeCardBadge>
        <RecipeCardBadge Icon={Flame}>{recipe?.calories}kcal</RecipeCardBadge>
        <RecipeCardBadge Icon={Clock4}>{recipe?.cookingTime} mins</RecipeCardBadge>
        <RecipeCardDifficultyBadge difficultyLevel={recipe?.difficulty} />
      </div>
      <div className="flex items-center gap-2">
        <Link href="#" className="flex items-center gap-1">
          <Image
            width={22}
            height={22}
            src={recipe?.author?.avatarUrl || "/images/avatar-placeholder.png"}
            alt={recipe?.author?.profile?.fullName || "Anonymous"}
            className="rounded-full select-none"
            draggable={false}
          />
          <span className="text-sm opacity-60">@userprofile</span>
        </Link>
        <Button size="xs">
          <UserPlus />
          Follow
        </Button>
      </div>
    </div>
  );
}
