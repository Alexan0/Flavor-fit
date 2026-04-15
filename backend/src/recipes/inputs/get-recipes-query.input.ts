import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import {
  SortOrder,
  MealType,
  DietaryPreference,
  HealthGoal,
  Cuisine,
  SpecialOccasion,
} from '../recipes.enums';

@InputType()
export class RecipesQueryInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  page: number = 1;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  limit: number = 1;

  @Field(() => String, { nullable: true })
  @IsString()
  searchTerm?: string;

  @Field(() => String, { nullable: true })
  @IsEnum(SortOrder)
  sort?: SortOrder;

  @Field(() => MealType, { nullable: true })
  @IsOptional()
  @IsEnum(MealType)
  mealType?: MealType;

  @Field(() => DietaryPreference, { nullable: true })
  @IsOptional()
  @IsEnum(DietaryPreference)
  dietaryPreference?: DietaryPreference;

  @Field(() => HealthGoal, { nullable: true })
  @IsOptional()
  @IsEnum(HealthGoal)
  healthGoal?: HealthGoal;

  @Field(() => Cuisine, { nullable: true })
  @IsOptional()
  @IsEnum(Cuisine)
  cuisine?: Cuisine;

  @Field(() => SpecialOccasion, { nullable: true })
  @IsOptional()
  @IsEnum(SpecialOccasion)
  specialOccasion?: SpecialOccasion;
}
