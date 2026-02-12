import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { RecipeIngredientModel } from '@recipes/models/recipe-ingredient.model';

@ObjectType()
export class OrderItemModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Int, { defaultValue: 1, nullable: false })
  quantity!: number;

  @Field(() => String, { nullable: false })
  price!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => RecipeIngredientModel, { nullable: false })
  recipeIngredient?: RecipeIngredientModel;
}
