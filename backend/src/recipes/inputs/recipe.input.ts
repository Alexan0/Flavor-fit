import { Field, InputType, Int } from '@nestjs/graphql';
import { NutritionFactInput } from './nutrition-fact.input';
import { RecipeStepInput } from './step.input';
import { Difficulty } from '../recipes.enums';
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
  @IsString()
  calories!: string;

  @Field(() => Int, { nullable: false })
  @IsPositive()
  cookingTime!: number;

  @Field(() => Difficulty, { nullable: false })
  @IsEnum(Difficulty)
  difficulty!: Difficulty;

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
