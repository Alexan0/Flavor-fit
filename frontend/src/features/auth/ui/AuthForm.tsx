"use client";

import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import type { IAuthFormData } from "../types/auth-form.types";

import { AuthChangeTypeForm } from "./AuthChangeTypeForm";
import { authFormSchema } from "./schema";

import { LoginDocument, RegisterDocument } from "@/__generated__/graphql";

interface Props {
  type: "login" | "register";
}

export function AuthForm({ type }: Props) {
  const isLogin = type === "login";
  const {
    handleSubmit,
    control,
    formState: { isValid, errors }
  } = useForm<IAuthFormData>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(authFormSchema)
  });

  const [auth, { loading }] = useMutation(isLogin ? LoginDocument : RegisterDocument, {
    onCompleted: () => {
      toast.success(isLogin ? "Logged in successfully" : "Registered successfully", {
        id: "auth-success",
        duration: 3000
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        id: "auth-error",
        duration: 3000
      });
    }
  });

  const onSubmit = async (data: IAuthFormData) => {
    await auth({
      variables: { data }
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
