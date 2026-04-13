import Image from "next/image";
import Link from "next/link";

import { PAGES } from "@/shared/config/page.config";

import { recipeCardImageVariants } from "../styles/recipe-card.styles";
import type { TRecipeCardSize } from "../types/recipe-card.types";

interface Props {
  image: string;
  name: string;
  size: TRecipeCardSize;
  slug: string;
}

export function RecipeCardImage({ image, name, size, slug }: Props) {
  return (
    <Link href={PAGES.RECIPE_DETAIL(slug)} className={recipeCardImageVariants({ size })}>
      <Image
        src={image}
        alt={name}
        className="object-cover transition-transform duration-200 will-change-transform select-none group-hover:scale-[1.03]"
        width={size === "sm" ? 100 : 120}
        height={size === "sm" ? 70 : 90}
        draggable={false}
      />
    </Link>
  );
}
