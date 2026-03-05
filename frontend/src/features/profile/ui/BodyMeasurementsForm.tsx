"use client";

import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";

import { InputLabel } from "@/shared/components/custom-ui/input-label/InputLabel";
import { Input } from "@/shared/components/ui/input";

import type { IProfileForm } from "../types/profile-update.types";

export function BodyMeasurementsForm() {
  const { register, control } = useFormContext<IProfileForm>();

  return (
    <div className="border-secondary flex flex-[48%] gap-2 overflow-auto rounded-3xl border p-5">
      <Image width={160} height={160} src="/images/male.svg" alt="salad" draggable={false} />
      <div className="w-full">
        <span className="mb-5 block text-lg font-semibold">Body measurements</span>
        <InputLabel label="Growth" placeholder="Height Cm" {...register("heightCm")} />
        <InputLabel label="Current weight" placeholder="Weight Kg" {...register("weightKg")} />
        <div className="flex gap-2">
          <div className="flex-auto">
            <InputLabel label="Waist circumference" placeholder="Waist Cm" {...register("waistCm")} />
          </div>
          <div className="flex-auto">
            <InputLabel label="Chest weight" placeholder="Chest Cm" {...register("chestCm")} />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-auto">
            <InputLabel label="Thigh circumference" placeholder="Thigh Cm" {...register("thighCm")} />
          </div>
          <div className="flex-auto">
            <InputLabel label="Arm weight" placeholder="Arm weight" {...register("armCm")} />
          </div>
        </div>
        <div className="mt-6">
          <InputLabel
            label="Set your nutritional goals"
            placeholder="Set your nutritional goals"
            {...register("nutritionGoal")}
          />
          <InputLabel
            label="Define your activity level"
            placeholder="Define your activity level"
            {...register("activityLevel")}
          />
        </div>
      </div>
    </div>
  );
}
