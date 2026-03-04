"use client";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { DURATION } from "@/shared/constants/toast.constants";

import { Captcha } from "./Captcha";
import { DecorativeImage } from "./DecorativeImage";
import { FormWrapper } from "./FormWrapper";
import { forgotPasswordSchema } from "./schema";

import { RequestPasswordResetDocument } from "@/__generated__/graphql";

interface FormData {
  email: string;
}

export function ForgotPassword() {
  const ref = useRef<TurnstileInstance | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema)
  });

  const [requestReset, { loading }] = useMutation(RequestPasswordResetDocument, {
    onCompleted: () => {
      toast.success("If email exist, reset link was sent", { id: "forgot-password-success", duration: DURATION });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "forgot-password-error", duration: DURATION });
      ref.current?.reset();
      setCaptchaToken(null);
    }
  });

  const onSubmit = (data: FormData) => {
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA challenge", { id: "captcha-error", duration: DURATION });
      return;
    }

    requestReset({
      variables: { data },
      context: {
        headers: {
          "cf-turnstile-token": captchaToken
        }
      }
    });
  };

  return (
    <FormWrapper title="Forgot password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
        <Captcha ref={ref} setCaptchaToken={setCaptchaToken} />
        <div className="text-center">
          <Button type="submit" disabled={!isValid || loading} variant="accent">
            Send reset link
          </Button>
        </div>
        <DecorativeImage />
      </form>
    </FormWrapper>
  );
}
