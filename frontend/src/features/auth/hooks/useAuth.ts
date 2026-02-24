import { useQuery } from "@apollo/client/react";

import { ProfileDocument } from "@/__generated__/graphql";

export function useAuth() {
  const { data, loading } = useQuery(ProfileDocument, {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first"
  });
  return {
    user: data?.profile,
    isLoading: loading,
    isLoggedIn: Boolean(data?.profile)
  };
}
