import { Field, InputType, Int } from '@nestjs/graphql';
import { NutritionFactInput } from './nutrition-fact.input';
import { RecipeStepInput } from './step.input';
import {
  Difficulty,
  DietaryPreference,
  MealType,
  HealthGoal,
  Cuisine,
  SpecialOccasion,
} from '../recipes.enums';
import { RecipeIngredientInput } from './recipe-ingredient.input';
import { IsEnum, IsPositive, IsString, MaxLength } from 'class-validator';

@InputType()
export class RecipeCreateInput {
  @Field(() => String, { nullable: false })
  @IsString()
  slug!: string;

  @Field(() => String, { nullable: false })
  @IsString()
  title!: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MaxLength(2000)
  description!: string;

  @Field(() => String, { nullable: false })
  @IsPositive()
  calories!: number;

  @Field(() => Int, { nullable: false })
  @IsPositive()
  cookingTime!: number;

  @Field(() => Difficulty, { nullable: false })
  @IsEnum(Difficulty)
  difficulty!: Difficulty;

  @Field(() => MealType, { nullable: false })
  @IsEnum(MealType)
  mealType!: MealType;

  @Field(() => DietaryPreference, { nullable: false })
  @IsEnum(DietaryPreference)
  dietaryPreference!: DietaryPreference;

  @Field(() => HealthGoal, { nullable: false })
  @IsEnum(HealthGoal)
  healthGoal!: HealthGoal;

  @Field(() => Cuisine, { nullable: false })
  @IsEnum(Cuisine)
  cuisine!: Cuisine;

  @Field(() => SpecialOccasion, { nullable: false })
  @IsEnum(SpecialOccasion)
  specialOccasion!: SpecialOccasion;

  @Field(() => NutritionFactInput, {
    nullable: true,
  })
  nutritionFact?: NutritionFactInput;

  @Field(() => String, { nullable: true })
  tags?: string[];

  @Field(() => [RecipeStepInput], { nullable: true })
  recipeSteps?: RecipeStepInput[];

  @Field(() => [RecipeIngredientInput], {
    nullable: true,
  })
  ingredients?: RecipeIngredientInput[];
}
