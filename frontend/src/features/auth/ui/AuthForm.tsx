"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { LoginDocument, RegisterDocument } from "@/__generated__/graphql";

import { cn } from "@/shared/utils";

import type { IAuthFormData } from "../types/auth-form.types";

import { AuthChangeTypeForm } from "./AuthChangeTypeForm";
import { authFormSchema } from "./schema";

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
      <div className="w-sm rounded-lg bg-linear-to-tr from-[#8062ee] to-[#a088fc] p-5 text-white shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold">{isLogin ? "Login" : "Register"}</h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Enter email:"
                className={cn("placeholder:text-gray-300", errors.email && "border-red-400")}
                errorMessage={errors.email?.message}
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
                className={cn("placeholder:text-gray-300", errors.password && "border-red-400")}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <div className="text-center">
            <Button type="submit" disabled={!isValid || loading} variant="accent">
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </form>
        <AuthChangeTypeForm isLogin={isLogin} />
      </div>
    </div>
  );
}
