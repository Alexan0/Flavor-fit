import { Field, ObjectType, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class IngredientModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  iconUrl!: string;

  @Field(() => Float, { nullable: false })
  price!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
