import { Field, InputType, Int } from '@nestjs/graphql';
import { NutritionFactInput } from './nutrition-fact.input';
import { RecipeStepInput } from './step.input';
import { Difficulty } from '../recipes.enums';
import { RecipeIngredientInput } from './recipe-ingredient.input';

@InputType()
export class RecipeCreateInput {
  @Field(() => String, { nullable: false })
  slug!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => String, { nullable: false })
  calories!: string;

  @Field(() => Int, { nullable: false })
  cookingTime!: number;

  @Field(() => Difficulty, { nullable: false })
  difficulty!: `${Difficulty}`;

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
