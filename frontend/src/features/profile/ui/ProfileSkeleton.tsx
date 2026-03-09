import { UserCog } from "lucide-react";

import { HeadingWithIcon } from "@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon";
import { SkeletonLoader } from "@/shared/components/custom-ui/skeleton-loader/SkeletonLoader";

export function ProfileSkeleton() {
  return (
    <div className="mt-10 h-[calc(100%-108px)] gap-6">
      <div className="h-full w-full rounded-3xl bg-white">
        <div className="flex items-center justify-between p-6">
          <HeadingWithIcon Icon={UserCog}>Personal Information</HeadingWithIcon>
          <div className="flex items-center gap-2">
            <SkeletonLoader className="mb-0 w-20" />
            <SkeletonLoader className="w-32" />
          </div>
        </div>
        <div className="flex h-[calc(100%-108px)] gap-6 px-6">
          <div className="border-secondary flex-[48%] overflow-auto rounded-3xl border p-5">
            <span className="mb-5 block text-lg font-semibold">General information</span>
            <SkeletonLoader />
            <SkeletonLoader />
            <div className="mb-3 flex gap-6">
              <div className="flex-[48%]">
                <SkeletonLoader />
              </div>
              <div className="flex-[48%]">
                <SkeletonLoader />
              </div>
            </div>
            <SkeletonLoader />
          </div>
          <div className="border-secondary flex flex-[48%] gap-8 overflow-auto rounded-3xl border p-5">
            <SkeletonLoader className="mt-12 h-[calc(100%-108px)] w-92" />
            <div className="w-full">
              <span className="mb-5 block text-lg font-semibold">Body measurements</span>
              <SkeletonLoader />
              <SkeletonLoader />
              <div className="mb-3 flex gap-2">
                <div className="flex-auto">
                  <SkeletonLoader />
                </div>
                <div className="flex-auto">
                  <SkeletonLoader />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-auto">
                  <SkeletonLoader />
                </div>
                <div className="flex-auto">
                  <SkeletonLoader />
                </div>
              </div>
              <div className="mt-6 space-y-2.5">
                <SkeletonLoader />
                <SkeletonLoader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
