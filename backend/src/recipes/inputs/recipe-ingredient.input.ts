import { Field, ID, InputType } from '@nestjs/graphql';
import { Unit } from '../recipes.enums';
import { IsEnum, IsPositive, IsString } from 'class-validator';

@InputType()
export class RecipeIngredientInput {
  @Field(() => ID)
  @IsString()
  ingredientId: string;

  @Field(() => Number)
  @IsPositive()
  quantity: number;

  @Field(() => Unit)
  @IsEnum(Unit)
  unit: Unit;
}
