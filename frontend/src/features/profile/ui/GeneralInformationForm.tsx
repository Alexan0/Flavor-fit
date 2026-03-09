"use client";

import { Controller, useFormContext, useFormState, useWatch } from "react-hook-form";
import { CalendarDays, CircleIcon, Contact, Mail } from "lucide-react";

import { InputLabel } from "@/shared/components/custom-ui/with-label/InputLabel";
import { SelectLabel } from "@/shared/components/custom-ui/with-label/SelectLabel";

import type { TProfileForm } from "../types/profile-update.types";
import { GENDER_OPTIONS } from "../utils/profile-form.utils";

import { AvatarUpload } from "./AvatarUpload";

export function GeneralInformationForm() {
  const { register, setValue, control } = useFormContext<TProfileForm>();

  const avatarUrl = useWatch({ control, name: "avatarUrl" });
  const { errors } = useFormState({ control });

  return (
    <div className="border-secondary flex-[48%] space-y-2.5 overflow-auto rounded-3xl border p-5">
      <span className="text-lg font-semibold">General information</span>
      <div className="mt-5 flex gap-3">
        <AvatarUpload
          value={avatarUrl || "https://avatars.githubusercontent.com/u/0?v=1"}
          onChange={(url) => setValue("avatarUrl", url)}
        />
        <div className="flex-auto">
          <InputLabel label="Full-name" Icon={Contact} placeholder="Full-name" {...register("profile.fullName")} />
        </div>
      </div>
      <InputLabel label="Email" Icon={Mail} type="email" placeholder="Email" {...register("email")} />
      <div className="flex gap-6">
        <div className="flex-[48%]">
          <Controller
            control={control}
            name="profile.gender"
            render={({ field }) => (
              <SelectLabel
                value={field.value || undefined}
                onChange={field.onChange}
                label="Gender"
                Icon={CircleIcon}
                placeholder="Select gender"
                options={GENDER_OPTIONS}
              />
            )}
          />
        </div>
        <div className="flex-[48%]">
          <InputLabel
            Icon={CalendarDays}
            label="Age"
            type="number"
            placeholder="Age"
            errorMessage={errors.profile?.age?.message}
            {...register("profile.age", { setValueAs: (value) => (value === "" ? undefined : Number(value)) })}
          />
        </div>
      </div>
      <label className="relative block">
        <span className="mb-1 block text-sm opacity-50">Bio</span>
        <textarea
          className="block w-full resize-none rounded-xl border bg-[#f1f1f1] p-3 font-mono"
          placeholder="Bio"
          {...register("profile.bio")}
        />
      </label>
    </div>
  );
}
