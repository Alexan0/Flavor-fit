import Image from "next/image";
import Link from "next/link";

import { type GetRecipeBySlugQuery } from "@/__generated__/graphql";

interface Props {
  comment: NonNullable<GetRecipeBySlugQuery["recipeBySlug"]["comments"]>[number];
}

export function RecipeCardComment({ comment }: Props) {
  const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="mb-2.5 rounded-md border border-gray-300 p-2.5 last:mb-0">
      <div className="flex items-center justify-between gap-2">
        <Link href="#" className="flex items-center gap-2">
          <Image
            width={20}
            height={20}
            src={comment.author.avatarUrl || "/images/avatar-placeholder.png"}
            alt={comment.author.profile?.fullName || "Anonymous"}
            className="h-6 w-6 rounded-full object-cover select-none"
            draggable={false}
          />
          <span className="font-semibold">@{comment.author.profile?.fullName}</span>
        </Link>
        {/* <EllipsisVertical size={20} color="gray" className="cursor-pointer" /> */}
      </div>
      <p className="mt-1 text-black/80">{comment.content}</p>
      <div className="mt-2 flex items-center justify-between gap-1">
        <span className="text-sm text-black/45">{formattedDate}</span>
        {/* <div className={recipeCardFooterTextVariants({ size: "default" })}>
          <Button
            variant="soft"
            size="icon-xs"
            disabled={loading}
            onClick={() =>
              recipeId &&
              toggleLike({
                variables: {
                  data: recipeId
                }
              })
            }
          >
            <Heart className="size-4" />
          </Button>
          <span>{formatCompactNumber(0)}</span>
        </div> */}
      </div>
    </div>
  );
}
