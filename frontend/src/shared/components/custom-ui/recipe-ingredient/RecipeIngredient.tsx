import Image from "next/image";

import { capitalizeFirstLetter } from "@/shared/utils/capitalizeFirstLetter.utils";

import type { Unit } from "@/__generated__/graphql";

interface Props {
  name: string;
  iconUrl: string;
  quantity?: number;
  unit?: Unit;
}

export function RecipeIngredient({ name, iconUrl, quantity, unit }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-3xl border border-gray-400 px-4 py-2">
      <Image width={40} height={40} src={`/${iconUrl}`} alt={name} className="select-none" draggable={false} />
      {quantity && (
        <span className="text-xs opacity-60">
          {quantity} {capitalizeFirstLetter(unit)}
        </span>
      )}
    </div>
  );
}
