"use client";

import { Search } from "lucide-react";

import { SkeletonLoader } from "@/shared/components/custom-ui/skeleton-loader/SkeletonLoader";
import { InputLabel } from "@/shared/components/custom-ui/with-label/InputLabel";
import { useAuth } from "@/shared/hooks/useAuth";

export function DashboardTopSide() {
  const { user, isLoading } = useAuth();

  return (
    <div className="flex items-end gap-6">
      {isLoading ? (
        <div className="flex flex-col">
          <SkeletonLoader className="h-7.5 w-60" />
          <SkeletonLoader className="h-5 w-60" />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl whitespace-nowrap">
            Hello, <b>{user?.profile?.fullName}</b>
          </h1>
          <p className="text-md">
            You have <b>8</b> activities today
          </p>
        </div>
      )}
      <InputLabel
        name="dashboard search"
        Icon={Search}
        placeholder="Search by recipes and more"
        className="h-11"
        parentClassName="w-full"
      />
    </div>
  );
}
