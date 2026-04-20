import { useState } from "react";
import type { LucideIcon } from "lucide-react";

import { HeadingWithIcon } from "@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon";
import { RecipeCard } from "@/shared/components/custom-ui/recipe-card/RecipeCard";
import type { TRecipeCardSize } from "@/shared/components/custom-ui/recipe-card/types/recipe-card.types";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/shared/components/ui/carousel";
import { cn } from "@/shared/utils";

import { useCarouselInfiniteScroll } from "../hooks/useCarouselInfiniteScroll";

import type { GetRecipesQuery } from "@/__generated__/graphql";

interface Props {
  Icon: LucideIcon;
  title: string;
  size: TRecipeCardSize;
  recipes: GetRecipesQuery["recipes"]["items"];
  hasMore?: boolean;
  isFetchingMore?: boolean;
  onLoadMore?: () => void | Promise<void>;
}

export function RecipeCarousel({ Icon, title, size, recipes, hasMore, isFetchingMore = false, onLoadMore }: Props) {
  const [api, setApi] = useState<CarouselApi>();

  useCarouselInfiniteScroll({
    api,
    hasMore,
    isFetchingMore,
    onLoadMore: async () => {
      if (!onLoadMore) return;
      await onLoadMore();
    }
  });

  return (
    <div className="mb-4">
      <HeadingWithIcon Icon={Icon}>{title}</HeadingWithIcon>
      {!recipes.length ? (
        <p className={cn("mt-2 flex items-center justify-center text-center text-xl", size === "sm" ? "h-70" : "h-60")}>
          No matching recipes found
        </p>
      ) : (
        <>
          <Carousel setApi={setApi} className="mt-2">
            <CarouselContent>
              {recipes.map((recipe) => (
                <CarouselItem key={recipe.slug} className={size === "sm" ? "basis-[20%]" : "basis-[25%]"}>
                  <RecipeCard recipe={recipe} size={size} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {isFetchingMore && <div className="mt-4"></div>}
        </>
      )}
    </div>
  );
}
