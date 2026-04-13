import { cva } from "class-variance-authority";

export const recipeCardVariants = cva("bg-white rounded-xl", {
  variants: {
    size: {
      default: "p-4",
      sm: "p-3.5"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export const recipeCardBadgeVariants = cva(
  "flex items-center gap-1.5 rounded-md bg-gray-200 font-medium text-black/70",
  {
    variants: {
      size: {
        default: "py-1.5 px-2 text-sm",
        sm: "h-8 px-2.5 text-xs"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);

export const recipeCardImageVariants = cva("relative w-full overflow-hidden rounded-2xl", {
  variants: {
    size: {
      default: "aspect-[1.45/1]",
      sm: "aspect-[1.42/1]"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export const recipeCardTitleVariants = cva("line-clamp-1 font-semibold tracking-tight text-black", {
  variants: {
    size: {
      default: "text-lg",
      sm: "text-base"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export const recipeCardDescriptionVariants = cva("line-clamp-2 text-black/55", {
  variants: {
    size: {
      default: "mt-2 text-sm leading-5",
      sm: "mt-1.5 text-xs leading-4"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export const recipeCardFooterTextVariants = cva("flex items-center gap-1.5 font-medium text-black/45", {
  variants: {
    size: {
      default: "text-xs",
      sm: "text-xs"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export const recipeCardDifficultyBadgeVariants = cva("flex items-center gap-1.5 rounded-md font-semibold px-2 py-1", {
  variants: {
    tone: {
      EASY: "bg-emerald-100 text-emerald-600",
      MEDIUM: "bg-amber-100 text-amber-600",
      HARD: "bg-red-100 text-red-600"
    },
    size: {
      default: "text-xs",
      sm: "text-xs"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
