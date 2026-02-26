"use server";

import { type NextRequest, NextResponse } from "next/server";
import { CombinedGraphQLErrors } from "@apollo/client";
import { set } from "zod";

import { GRAPHQL_SERVER_URL } from "@/shared/config/api.config";
import { PAGES } from "@/shared/config/page.config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/shared/constants/app.constants";

import { getApolloClient } from "../apollo/apollo-client";

import { GetNewTokensDocument, type GetNewTokensQuery } from "@/__generated__/graphql";

export async function getTokens(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  if (!refreshToken) {
    request.cookies.delete(ACCESS_TOKEN);
    return null;
  }

  if (!accessToken) {
    try {
      const refreshResponse = await fetch(GRAPHQL_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `${REFRESH_TOKEN}=${refreshToken}`
        },
        body: JSON.stringify({
          query: `
						query {
							newTokens {
								user { id }
							}
						}
					`
        })
      });

      if (!refreshResponse.ok) {
        return null;
      }

      const setCookie = refreshResponse.headers.get("set-Cookie");

      return {
        isRefreshToken: true,
        setCookie
      };
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const isInvalid = error.errors.some(
          (e) => e.message === "invalid token" || e.extensions?.code === "UNAUTHENTICATED"
        );
        if (isInvalid) {
          request.cookies.delete(REFRESH_TOKEN);
          request.cookies.delete(ACCESS_TOKEN);
          return null;
        }
      }
      return null;
    }
  }

  return { refreshToken, accessToken };
}
