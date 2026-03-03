"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { PAGES } from "@/shared/config/page.config";

import type { IAuthFormData } from "../types/auth-form.types";

import { AuthChangeTypeForm } from "./AuthChangeTypeForm";
import { authFormSchema } from "./schema";

import {
  LoginDocument,
  type LoginMutation,
  type LoginMutationVariables,
  ProfileDocument,
  type ProfileQuery,
  RegisterDocument,
  type RegisterMutation,
  type RegisterMutationVariables
} from "@/__generated__/graphql";

interface Props {
  type: "login" | "register";
}

export function AuthForm({ type }: Props) {
  const isLogin = type === "login";
  const client = useApolloClient();
  const router = useRouter();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { isValid, errors }
  } = useForm<IAuthFormData>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(authFormSchema)
  });

  const [auth, { loading }] = useMutation<
    LoginMutation | RegisterMutation,
    LoginMutationVariables | RegisterMutationVariables
  >(isLogin ? LoginDocument : RegisterDocument, {
    onCompleted: (data) => {
      const authData = "login" in data ? data.login : data.register;

      client.writeQuery({
        query: ProfileDocument,
        data: { profile: authData.user as ProfileQuery["profile"] }
      });

      toast.success(isLogin ? "Logged in successfully" : "Registered successfully", {
        id: "auth-success",
        duration: 3000
      });

      router.replace(PAGES.DASHBOARD);
    },
    onError: (error) => {
      toast.error(error.message, {
        id: "auth-error",
        duration: 3000
      });
    }
  });

  const onSubmit = async (data: IAuthFormData) => {
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA challenge", { id: "captcha-error" });
      return;
    }

    await auth({
      variables: { data },
      context: {
        headers: {
          "cf-turnstile-token": captchaToken
        }
      }
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative w-sm rounded-lg bg-linear-to-tr from-[#8062ee] to-[#a088fc] p-5 text-white shadow-lg">
        <h1 className="mb-6 text-center text-4xl font-bold">{isLogin ? "Login" : "Register"}</h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Enter email:"
                errorMessage={errors.email?.message}
                aria-invalid={!!errors.email}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Enter password:"
                errorMessage={errors.password?.message}
                aria-invalid={!!errors.password}
              />
            )}
          />
          <div className="flex justify-center pt-2">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
              options={{ theme: "light", language: "en" }}
            />
          </div>
          <div className="text-center">
            <Button type="submit" disabled={!isValid || loading} variant="accent">
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
          <Image
            width={160}
            height={160}
            src="/images/salad.png"
            alt="salad"
            className="absolute -bottom-14 -left-14 -rotate-12 select-none"
            draggable={false}
          />
        </form>
        <AuthChangeTypeForm isLogin={isLogin} />
      </div>
    </div>
  );
}
