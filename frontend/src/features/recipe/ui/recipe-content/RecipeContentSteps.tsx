import Image from "next/image";
import { CookingPot } from "lucide-react";

import type { GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  steps: GetRecipeBySlugQuery["recipeBySlug"]["recipeSteps"];
}

export function RecipeContentSteps({ steps }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <CookingPot className="opacity-60" />
        <h3 className="text-lg font-semibold">Step-by-step preparation instruction:</h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {steps?.map((step, index) => (
          <div key={step.id} className="w-60">
            <Image
              width={280}
              height={150}
              src={step.image}
              alt={step.title}
              className="h-40 w-full rounded-3xl object-cover select-none"
              draggable={false}
            />
            <span className="mt-2 block text-sm font-medium opacity-80">
              Step {index + 1} of {steps.length}
            </span>
            <span className="font-semibold">{step.title}:</span>
            <p className="mt-1 text-xs opacity-60">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
