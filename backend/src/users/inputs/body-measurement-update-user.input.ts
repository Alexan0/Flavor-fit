import { Field, InputType, Int } from '@nestjs/graphql';
import { ActivityLevel, NutritionGoal } from '../users.enums';
import { IsEnum, IsPositive } from 'class-validator';

@InputType()
export class BodyMeasurementUpdateInput {
  @Field(() => Int, { nullable: true })
  @IsPositive()
  heightCm?: number | null;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  weightKg?: number | null;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  goalWeightKg?: number | null;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  chestCm?: number | null;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  waistCm?: number | null;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  thighCm?: number | null;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  armCm?: number | null;

  @Field(() => ActivityLevel, { nullable: true })
  @IsEnum(ActivityLevel)
  activityLevel?: ActivityLevel | null;

  @Field(() => NutritionGoal, { nullable: true })
  @IsEnum(NutritionGoal)
  nutritionGoal?: NutritionGoal | null;
}
