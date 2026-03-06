"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client/react";
import { UserCog } from "lucide-react";

import { HeadingWithIcon } from "@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon";
import { Button } from "@/shared/components/ui/button";

import type { IProfileForm } from "../types/profile-update.types";

import { BodyMeasurementsForm } from "./BodyMeasurementsForm";
import { GeneralInformationForm } from "./GeneralInformationForm";

import { GetProfileDocument, UpdateProfileDocument } from "@/__generated__/graphql";

export function Profile() {
  const { data } = useQuery(GetProfileDocument);

  const formMethods = useForm<IProfileForm>({
    mode: "onChange",
    defaultValues: {
      // avatarUrl: data?.profile.avatarUrl,
      email: data?.profile.email
    }
  });

  const [updateProfile, {}] = useMutation(UpdateProfileDocument);

  const onSubmit = (data: IProfileForm) => {
    updateProfile({ variables: { data } });
  };

  return (
    <main className="mt-10 flex h-[calc(100%-108px)] gap-6">
      {/* TODO: заглушка сайдабара */}
      <div className="h-full w-1/7 rounded-3xl bg-white"></div>
      <form className="h-full w-full rounded-3xl bg-white" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between p-6">
          <HeadingWithIcon Icon={UserCog}>Personal Information</HeadingWithIcon>
          <div className="flex items-center gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button variant="accent">Save changes</Button>
          </div>
        </div>
        <div className="flex h-[calc(100%-108px)] gap-6 px-6">
          <FormProvider {...formMethods}>
            <GeneralInformationForm />
            <BodyMeasurementsForm />
          </FormProvider>
        </div>
      </form>
    </main>
  );
}
