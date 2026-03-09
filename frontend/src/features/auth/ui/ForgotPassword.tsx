"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { DURATION } from "@/shared/constants/toast.constants";

import { forgotPasswordSchema } from "../schemas/auth.schema";
import type { IForgotPasswordFormData } from "../types/form.types";

import { Captcha } from "./Captcha";
import { DecorativeImage } from "./DecorativeImage";
import { FormWrapper } from "./FormWrapper";

import { RequestPasswordResetDocument } from "@/__generated__/graphql";

export function ForgotPassword() {
  const ref = useRef<TurnstileInstance | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = useForm<IForgotPasswordFormData>({
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

  const onSubmit = (data: IForgotPasswordFormData) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter email:"
          errorMessage={errors.email?.message}
          aria-invalid={!!errors.email}
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
