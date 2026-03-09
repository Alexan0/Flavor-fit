"use client";

import { useQuery } from "@apollo/client/react";

import { ProfileForm } from "./ProfileForm";
import { ProfileSkeleton } from "./ProfileSkeleton";

import { GetProfileDocument } from "@/__generated__/graphql";

export function Profile() {
  const { data, loading } = useQuery(GetProfileDocument);

  if (!data || loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="mt-10 h-[calc(100%-108px)] gap-6">
      <ProfileForm data={data} />
    </div>
  );
}
