import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RecipeTagInput {
  @Field(() => String, { nullable: false })
  @IsString()
  name!: string;
}
