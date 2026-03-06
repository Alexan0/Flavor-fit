"use client";

import { useFormContext } from "react-hook-form";
import { CalendarDays, Contact, Mail } from "lucide-react";

import { FormSelect } from "@/shared/components/custom-ui/form-select/FormSelect";
import { InputLabel } from "@/shared/components/custom-ui/input-label/InputLabel";

import type { IProfileForm } from "../types/profile-update.types";
import { GENDER_OPTIONS } from "../utils/profile-form.utils";

import { AvatarUpload } from "./AvatarUpload";

export function GeneralInformationForm() {
  const { register, watch, setValue } = useFormContext<IProfileForm>();

  const avatarUrl = watch("avatarUrl");

  return (
    <div className="border-secondary flex-[48%] overflow-auto rounded-3xl border p-5">
      <span className="text-lg font-semibold">General information</span>
      <div className="mt-5 flex gap-3">
        <AvatarUpload
          value={avatarUrl || "https://avatars.githubusercontent.com/u/0?v=1"}
          onChange={(url) => setValue("avatarUrl", url)}
        />
        <div className="flex-auto">
          <InputLabel label="Full-name" Icon={Contact} placeholder="Full-name" {...register("fullname")} />
        </div>
      </div>
      <InputLabel label="Email" Icon={Mail} type="email" placeholder="Email" {...register("email")} />
      <div className="flex gap-6">
        <div className="flex-[48%]">
          <FormSelect name="gender" label="Gender" placeholder="Select gender" options={GENDER_OPTIONS} />
        </div>
        <div className="flex-[48%]">
          <InputLabel Icon={CalendarDays} label="Age" type="number" placeholder="Age" {...register("age")} />
        </div>
      </div>
      <label className="relative block">
        <span className="mb-1 block text-sm opacity-50">Bio</span>
        <textarea
          className="block w-full resize-none rounded-xl border bg-[#f1f1f1] p-3 font-mono"
          placeholder="Bio"
          {...register("bio")}
        />
      </label>
    </div>
  );
}
