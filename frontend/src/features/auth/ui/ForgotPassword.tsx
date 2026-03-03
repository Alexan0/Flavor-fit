"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import z from "zod";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { RequestPasswordResetDocument } from "@/__generated__/graphql";

interface FormData {
  email: string;
}

export function ForgotPassword() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { email: "" },
    resolver: zodResolver(
      z.object({
        email: z.email("Invalid email")
      })
    )
  });

  const [requestReset, { loading }] = useMutation(RequestPasswordResetDocument, {
    onCompleted: () => {
      toast.success("If email exist, reset link was sent");
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  });

  const onSubmit = (data: FormData) => {
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA challenge", { id: "captcha-error" });
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
    <div className="flex h-screen items-center justify-center">
      <div className="relative w-sm rounded-lg bg-linear-to-tr from-[#8062ee] to-[#a088fc] p-5 text-white shadow-lg">
        <h1 className="mb-6 text-center text-4xl font-bold">Reset password</h1>
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
              Send reset link
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
      </div>
    </div>
  );
}
