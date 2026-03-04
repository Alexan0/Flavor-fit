"use client";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { PAGES } from "@/shared/config/page.config";
import { DURATION } from "@/shared/constants/toast.constants";

import { Captcha } from "./Captcha";
import { DecorativeImage } from "./DecorativeImage";
import { FormWrapper } from "./FormWrapper";
import { resetPasswordSchema } from "./schema";

import { ResetPasswordDocument } from "@/__generated__/graphql";

interface FormData {
  password: string;
  repeatPassword: string;
}

export function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = useRef<TurnstileInstance | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { password: "", repeatPassword: "" },
    resolver: zodResolver(resetPasswordSchema)
  });

  const [resetPassword, { loading }] = useMutation(ResetPasswordDocument, {
    onCompleted: () => {
      toast.success("Password successfully changed", { id: "reset-password-success", duration: DURATION });
      router.replace(PAGES.LOGIN);
    },
    onError: () => {
      toast.error("Invalid or expired link", { id: "reset-password-error", duration: DURATION });
    }
  });

  const onSubmit = (data: FormData) => {
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA challenge", { id: "captcha-error", duration: DURATION });
      return;
    }

    if (!token) return;

    resetPassword({
      variables: { data: { newPassword: data.password, token } },
      context: {
        headers: {
          "cf-turnstile-token": captchaToken
        }
      }
    });
  };

  return (
    <FormWrapper title="Reset password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
        <Controller
          control={control}
          name="repeatPassword"
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Repeat password:"
              errorMessage={errors.repeatPassword?.message}
              aria-invalid={!!errors.repeatPassword}
            />
          )}
        />
        <Captcha ref={ref} setCaptchaToken={setCaptchaToken} />
        <div className="text-center">
          <Button type="submit" disabled={!isValid || loading} variant="accent">
            Reset password
          </Button>
        </div>
        <DecorativeImage />
      </form>
    </FormWrapper>
  );
}
