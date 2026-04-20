"use client";

import { type Dispatch, type SetStateAction, useCallback, useState } from "react";
import type { useQuery } from "@apollo/client/react";

import type { GetRecipesQuery, GetRecipesQueryVariables, RecipesQueryInput } from "@/__generated__/graphql";

interface Props {
  fetchMore: ReturnType<typeof useQuery<GetRecipesQuery, GetRecipesQueryVariables>>["fetchMore"];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  input: RecipesQueryInput;
  sort: "RECOMMENDED" | "POPULAR";
  hasMore?: boolean;
}

export function useFetchMoreRecipes({ fetchMore, page, setPage, input, sort, hasMore }: Props) {
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMore = useCallback(async () => {
    if (isFetchingMore || !hasMore) return;

    const nextPage = page + 1;
    setIsFetchingMore(true);

    try {
      await fetchMore({
        variables: {
          input: {
            ...input,
            page: nextPage,
            sort
          }
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          setPage(nextPage);

          return {
            ...prev,
            recipes: {
              ...fetchMoreResult.recipes,
              items: [...prev.recipes.items, ...fetchMoreResult.recipes.items]
            }
          };
        }
      });
    } finally {
      setIsFetchingMore(false);
    }
  }, [fetchMore, hasMore, input, isFetchingMore, page, setPage, sort]);

  return { loadMore, isFetchingMore };
}
