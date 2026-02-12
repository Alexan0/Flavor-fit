import { Field, Float, InputType } from '@nestjs/graphql';
import { Unit } from '@src/recipes/recipes.enums';

@InputType()
export class IngredientCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Unit, { nullable: true })
  defaultUnit: `${Unit}`;

  @Field(() => Float, { nullable: false })
  price!: number;

  @Field(() => String)
  iconUrl!: string;

  @Field(() => String)
  content!: string;
}
