"use server";

import { type NextRequest } from "next/server";
import { CombinedGraphQLErrors } from "@apollo/client";

import { GRAPHQL_SERVER_URL } from "@/shared/config/api.config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/shared/constants/app.constants";

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
