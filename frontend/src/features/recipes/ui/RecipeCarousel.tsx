import type { LucideIcon } from "lucide-react";

import { HeadingWithIcon } from "@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon";
import { RecipeCard } from "@/shared/components/custom-ui/recipe-card/RecipeCard";
import type { TRecipeCardSize } from "@/shared/components/custom-ui/recipe-card/types/recipe-card.types";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/components/ui/carausel";
import { cn } from "@/shared/utils";

import type { GetRecipesQuery } from "@/__generated__/graphql";

interface Props {
  Icon: LucideIcon;
  title: string;
  size: TRecipeCardSize;
  recipes: GetRecipesQuery["recipes"];
}

export function RecipeCarousel({ Icon, title, size, recipes }: Props) {
  return (
    <div className="mb-4">
      <HeadingWithIcon Icon={Icon}>{title}</HeadingWithIcon>
      {!recipes.length ? (
        <p className={cn("mt-2 flex items-center justify-center text-center text-xl", size === "sm" ? "h-70" : "h-60")}>
          No matching recipes found
        </p>
      ) : (
        <Carousel className="mt-2">
          <CarouselContent>
            {recipes.map((recipe) => (
              <CarouselItem key={recipe.slug} className={size === "sm" ? "basis-[20%]" : "basis-[25%]"}>
                <RecipeCard recipe={recipe} size={size} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
