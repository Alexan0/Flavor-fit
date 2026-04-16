"use client";

import { Controller, useFormContext, useFormState, useWatch } from "react-hook-form";
import { CalendarDays, CircleIcon, Contact, Mail } from "lucide-react";

import { InputLabel } from "@/shared/components/custom-ui/with-label/InputLabel";
import { SelectLabel } from "@/shared/components/custom-ui/with-label/SelectLabel";

import { GENDER_OPTIONS } from "../data/profile-form.data";
import type { TProfileForm } from "../types/profile-update.types";

import { AvatarUpload } from "./AvatarUpload";

export function GeneralInformationForm() {
  const { setValue, control } = useFormContext<TProfileForm>();

  const avatarUrl = useWatch({ control, name: "avatarUrl" });
  const { errors } = useFormState({ control });

  return (
    <div className="border-secondary flex-[48%] space-y-2.5 overflow-auto rounded-3xl border p-5">
      <span className="text-lg font-semibold">General information</span>
      <div className="mt-5 flex gap-3">
        <AvatarUpload
          value={avatarUrl || "https://avatars.githubusercontent.com/u/0?v=1"}
          onChange={(url) => setValue("avatarUrl", url, { shouldDirty: true })}
        />
        <div className="flex-auto">
          <Controller
            control={control}
            name="profile.fullName"
            render={({ field }) => (
              <InputLabel
                {...field}
                value={field.value ?? ""}
                label="Full-name"
                Icon={Contact}
                placeholder="Full-name"
              />
            )}
          />
        </div>
      </div>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <InputLabel {...field} value={field.value ?? ""} label="Email" Icon={Mail} type="email" placeholder="Email" />
        )}
      />
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
          <Controller
            control={control}
            name="profile.age"
            render={({ field }) => (
              <InputLabel
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                Icon={CalendarDays}
                label="Age"
                type="number"
                placeholder="Age"
                errorMessage={errors.profile?.age?.message}
              />
            )}
          />
        </div>
      </div>
      <label className="relative block">
        <span className="mb-1 block text-sm opacity-50">Bio</span>
        <Controller
          control={control}
          name="profile.bio"
          render={({ field }) => (
            <textarea
              {...field}
              value={field.value ?? ""}
              className="block w-full resize-none rounded-xl border bg-[#f1f1f1] p-3 font-mono"
              placeholder="Bio"
            />
          )}
        />
      </label>
    </div>
  );
}
