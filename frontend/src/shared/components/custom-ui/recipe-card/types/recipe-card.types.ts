import type { VariantProps } from "class-variance-authority";

import type { recipeCardVariants } from "../styles/recipe-card.styles";

export type TRecipeCardSize = VariantProps<typeof recipeCardVariants>["size"];
