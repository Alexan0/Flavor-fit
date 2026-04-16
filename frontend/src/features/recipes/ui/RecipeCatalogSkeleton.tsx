import { BookHeart, Star } from "lucide-react";

import { HeadingWithIcon } from "@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon";
import { SkeletonLoader } from "@/shared/components/custom-ui/skeleton-loader/SkeletonLoader";

export function RecipeCatalogSkeleton() {
  return (
    <div className="mt-4 h-[calc(100%-155px)] overflow-auto">
      <div>
        <div className="mb-4">
          <HeadingWithIcon Icon={BookHeart}>Recommended</HeadingWithIcon>
          <div className="mt-2 flex gap-4">
            <SkeletonLoader count={4} className="h-94" />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <HeadingWithIcon Icon={Star}>Popular</HeadingWithIcon>
          <div className="mt-2 flex gap-4">
            <SkeletonLoader count={5} className="h-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
