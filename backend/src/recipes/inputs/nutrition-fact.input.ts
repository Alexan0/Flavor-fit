import { Field, Float, InputType } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class NutritionFactInput {
  @Field(() => Float, { nullable: false })
  @IsPositive()
  proteins!: number;

  @Field(() => Float, { nullable: false })
  @IsPositive()
  fats!: number;

  @Field(() => Float, { nullable: false })
  @IsPositive()
  carbohydrates!: number;

  @Field(() => Float, { nullable: false })
  @IsPositive()
  fiber!: number;
}
