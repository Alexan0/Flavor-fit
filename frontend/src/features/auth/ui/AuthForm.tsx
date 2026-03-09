"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { PAGES } from "@/shared/config/page.config";
import { DURATION } from "@/shared/constants/toast.constants";

import { authFormSchema } from "../schemas/auth.schema";
import type { IAuthFormData } from "../types/form.types";

import { AuthChangeTypeForm } from "./AuthChangeTypeForm";
import { Captcha } from "./Captcha";
import { DecorativeImage } from "./DecorativeImage";
import { FormWrapper } from "./FormWrapper";

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
  const ref = useRef<TurnstileInstance | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
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
        duration: DURATION
      });

      router.replace(PAGES.DASHBOARD);
    },
    onError: (error) => {
      toast.error(error.message, { id: "auth-error", duration: DURATION });
      ref.current?.reset();
      setCaptchaToken(null);
    }
  });

  const onSubmit = async (data: IAuthFormData) => {
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA challenge", { id: "captcha-error", duration: DURATION });
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
    <FormWrapper title={isLogin ? "Login" : "Register"}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter email:"
          errorMessage={errors.email?.message}
          aria-invalid={!!errors.email}
        />
        <Input
          {...register("password")}
          type="password"
          placeholder="Enter password:"
          errorMessage={errors.password?.message}
          aria-invalid={!!errors.password}
        />
        <Captcha ref={ref} setCaptchaToken={setCaptchaToken} />
        <div className="text-center">
          <Button type="submit" disabled={!isValid || loading} variant="accent">
            {isLogin ? "Login" : "Register"}
          </Button>
        </div>
        <DecorativeImage />
      </form>
      <AuthChangeTypeForm isLogin={isLogin} />
    </FormWrapper>
  );
}
