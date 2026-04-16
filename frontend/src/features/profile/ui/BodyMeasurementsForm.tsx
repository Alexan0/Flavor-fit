"use client";

import { Controller, useFormContext, useFormState, useWatch } from "react-hook-form";
import Image from "next/image";
import { Activity, Goal, Ruler, Weight } from "lucide-react";

import { InputLabel } from "@/shared/components/custom-ui/with-label/InputLabel";
import { SelectLabel } from "@/shared/components/custom-ui/with-label/SelectLabel";

import { ACTIVITY_LEVEL_OPTIONS, NUTRITION_GOAL_OPTIONS } from "../data/profile-form.data";
import type { TProfileForm } from "../types/profile-update.types";

export function BodyMeasurementsForm() {
  const { control } = useFormContext<TProfileForm>();

  const gender = useWatch({ control, name: "profile.gender" });
  const { errors } = useFormState({ control });

  return (
    <div className="border-secondary flex flex-[48%] gap-2 overflow-auto rounded-3xl border p-5">
      <Image
        width={250}
        height={250}
        src={gender === "MALE" ? "/images/male.svg" : "/images/female.svg"}
        alt={gender || "gender"}
        draggable={false}
      />
      <div className="w-full space-y-2.5">
        <span className="mb-5 block text-lg font-semibold">Body measurements</span>
        <Controller
          control={control}
          name="measurements.heightCm"
          render={({ field }) => (
            <InputLabel
              {...field}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
              Icon={Ruler}
              label="Growth"
              placeholder="Height Cm"
              type="number"
              errorMessage={errors.measurements?.heightCm?.message}
            />
          )}
        />
        <div className="flex gap-2">
          <div className="flex-auto">
            <Controller
              control={control}
              name="measurements.weightKg"
              render={({ field }) => (
                <InputLabel
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  Icon={Weight}
                  label="Current weight"
                  placeholder="Weight Kg"
                  type="number"
                  errorMessage={errors.measurements?.weightKg?.message}
                />
              )}
            />
          </div>
          <div className="flex-auto">
            <Controller
              control={control}
              name="measurements.goalWeightKg"
              render={({ field }) => (
                <InputLabel
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  Icon={Weight}
                  label="Goal weight"
                  placeholder="Weight Kg"
                  type="number"
                  errorMessage={errors.measurements?.goalWeightKg?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-auto">
            <Controller
              control={control}
              name="measurements.waistCm"
              render={({ field }) => (
                <InputLabel
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  Icon={Ruler}
                  label="Waist circumference"
                  placeholder="Waist Cm"
                  type="number"
                  errorMessage={errors.measurements?.waistCm?.message}
                />
              )}
            />
          </div>
          <div className="flex-auto">
            <Controller
              control={control}
              name="measurements.chestCm"
              render={({ field }) => (
                <InputLabel
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  Icon={Ruler}
                  label="Chest weight"
                  placeholder="Chest Cm"
                  type="number"
                  errorMessage={errors.measurements?.chestCm?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-auto">
            <Controller
              control={control}
              name="measurements.thighCm"
              render={({ field }) => (
                <InputLabel
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  Icon={Ruler}
                  label="Thigh circumference"
                  placeholder="Thigh Cm"
                  type="number"
                  errorMessage={errors.measurements?.thighCm?.message}
                />
              )}
            />
          </div>
          <div className="flex-auto">
            <Controller
              control={control}
              name="measurements.armCm"
              render={({ field }) => (
                <InputLabel
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  Icon={Ruler}
                  label="Arm circumference"
                  placeholder="Arm Cm"
                  type="number"
                  errorMessage={errors.measurements?.armCm?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-6 space-y-2.5">
          <Controller
            control={control}
            name="measurements.nutritionGoal"
            render={({ field }) => (
              <SelectLabel
                value={field.value || undefined}
                onChange={field.onChange}
                Icon={Goal}
                label="Set your nutritional goals"
                placeholder="Set your nutritional goals"
                options={NUTRITION_GOAL_OPTIONS}
              />
            )}
          />
          <Controller
            control={control}
            name="measurements.activityLevel"
            render={({ field }) => (
              <SelectLabel
                value={field.value || undefined}
                onChange={field.onChange}
                Icon={Activity}
                label="Define your activity level"
                placeholder="Define your activity level"
                options={ACTIVITY_LEVEL_OPTIONS}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
