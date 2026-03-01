import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive, IsString, MaxLength } from 'class-validator';

@InputType()
export class RecipeStepInput {
  @Field(() => Int, { nullable: false })
  @IsPositive()
  order!: number;

  @Field(() => String, { nullable: false })
  @IsString()
  title!: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MaxLength(2000)
  description!: string;
}
