"use client";

import { ApolloProvider } from "@apollo/client/react";
import type { ReactNode } from "react";

import { getApolloClient } from "@/shared/lib/apollo/apollo-client";

const apollo = getApolloClient();

export function Provider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apollo}>{children}</ApolloProvider>;
}
