import { MessageCircleMore } from "lucide-react";

import { RecipeCardFooterStats } from "@/shared/components/custom-ui/recipe-card/ui/RecipeCardFooterStats";

import { RecipeAddComment } from "./RecipeAddComment";
import { RecipeCardComment } from "./RecipeCardComment";

import type { GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  comments?: GetRecipeBySlugQuery["recipeBySlug"]["comments"];
  likes?: number | null;
  views?: number;
  recipeId?: string;
}

export function RecipeComments({ comments, likes, views, recipeId }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <MessageCircleMore className="opacity-30" />
        <h3 className="text-lg font-semibold">Comments:</h3>
        <span className="min-w-8 rounded-md bg-gray-200 px-1.5 py-1 text-center text-xs text-gray-600">
          {comments?.length}
        </span>
      </div>
      <div className="mt-2 ml-8 flex items-center gap-2">
        <RecipeCardFooterStats likes={likes} views={views} />
      </div>
      <div className="mt-4 h-auto flex-1 overflow-auto">
        {comments?.map((comment) => (
          <RecipeCardComment key={comment.id} comment={comment} />
        ))}
      </div>
      <RecipeAddComment recipeId={recipeId} />
    </div>
  );
}
