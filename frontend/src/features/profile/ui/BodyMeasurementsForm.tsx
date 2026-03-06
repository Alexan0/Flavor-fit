"use client";

import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Ruler, Weight } from "lucide-react";

import { FormSelect } from "@/shared/components/custom-ui/form-select/FormSelect";
import { InputLabel } from "@/shared/components/custom-ui/input-label/InputLabel";

import type { IProfileForm } from "../types/profile-update.types";
import { ACTIVITY_LEVEL_OPTIONS, NUTRITION_GOAL_OPTIONS } from "../utils/profile-form.utils";

export function BodyMeasurementsForm() {
  const { register, watch } = useFormContext<IProfileForm>();

  const gender = watch("fullname");

  return (
    <div className="border-secondary flex flex-[48%] gap-2 overflow-auto rounded-3xl border p-5">
      <Image
        width={160}
        height={160}
        src={gender === "MALE" ? "/images/male.svg" : "/images/female.svg"}
        alt={gender}
        draggable={false}
      />
      <div className="w-full">
        <span className="mb-5 block text-lg font-semibold">Body measurements</span>
        <InputLabel Icon={Ruler} label="Growth" placeholder="Height Cm" {...register("heightCm")} />
        <InputLabel Icon={Weight} label="Current weight" placeholder="Weight Kg" {...register("weightKg")} />
        <div className="flex gap-2">
          <div className="flex-auto">
            <InputLabel Icon={Ruler} label="Waist circumference" placeholder="Waist Cm" {...register("waistCm")} />
          </div>
          <div className="flex-auto">
            <InputLabel Icon={Ruler} label="Chest weight" placeholder="Chest Cm" {...register("chestCm")} />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-auto">
            <InputLabel Icon={Ruler} label="Thigh circumference" placeholder="Thigh Cm" {...register("thighCm")} />
          </div>
          <div className="flex-auto">
            <InputLabel Icon={Ruler} label="Arm circumference" placeholder="Arm circumference" {...register("armCm")} />
          </div>
        </div>
        <div className="mt-6 space-y-2.5">
          <FormSelect
            name="nutritionGoal"
            label="Set your nutritional goals"
            placeholder="Set your nutritional goals"
            options={NUTRITION_GOAL_OPTIONS}
          />
          <FormSelect
            name="activityLevel"
            label="Define your activity level"
            placeholder="Define your activity level"
            options={ACTIVITY_LEVEL_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
}
