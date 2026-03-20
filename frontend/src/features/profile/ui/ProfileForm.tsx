"use client";

import { FormProvider, useForm, useFormState } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCog } from "lucide-react";

import { HeadingWithIcon } from "@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon";
import { Button } from "@/shared/components/ui/button";
import { DURATION } from "@/shared/constants/toast.constants";
import { removeTypename } from "@/shared/utils/remove-typename.utils";

import { updateProfileSchema } from "../schemas/profile.schema";
import type { TProfileForm } from "../types/profile-update.types";

import { BodyMeasurementsForm } from "./BodyMeasurementsForm";
import { GeneralInformationForm } from "./GeneralInformationForm";

import { type GetProfileQuery, UpdateProfileDocument } from "@/__generated__/graphql";

interface Props {
  data: GetProfileQuery;
}

export function ProfileForm({ data }: Props) {
  const initialData = {
    email: data.profile.email ?? "",
    avatarUrl: data.profile.avatarUrl ?? "",
    profile: data.profile.profile ?? {},
    measurements: data.profile.measurements ?? {}
  };

  const form = useForm<TProfileForm>({
    mode: "onChange",
    defaultValues: initialData,
    resolver: zodResolver(updateProfileSchema)
  });

  const { isDirty, isValid } = useFormState({ control: form.control });

  const [updateProfile, { loading }] = useMutation(UpdateProfileDocument, {
    onCompleted: () => {
      toast.success("Profile updated", {
        id: "update-profile-success",
        duration: DURATION
      });

      form.reset(form.getValues());
    },
    onError: (error) => {
      toast.error(error.message, { id: "update-profile-error", duration: DURATION });
    }
  });

  const onSubmit = (data: TProfileForm) => {
    const cleanedData = {
      ...data,
      profile: data.profile ? removeTypename(data.profile) : {},
      measurements: data.measurements ? removeTypename(data.measurements) : {}
    };
    updateProfile({ variables: { data: cleanedData } });
  };

  return (
    <form className="h-full w-full rounded-3xl bg-white" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between p-6">
        <HeadingWithIcon Icon={UserCog}>Personal Information</HeadingWithIcon>
        <div className="flex items-center gap-2">
          <Button variant="secondary" type="button" disabled={!isDirty} onClick={() => form.reset(initialData)}>
            Reset
          </Button>
          <Button variant="accent" type="submit" disabled={!isValid || !isDirty || loading}>
            Save changes
          </Button>
        </div>
      </div>
      <div className="flex h-[calc(100%-108px)] gap-6 px-6">
        <FormProvider {...form}>
          <GeneralInformationForm />
          <BodyMeasurementsForm />
        </FormProvider>
      </div>
    </form>
  );
}
