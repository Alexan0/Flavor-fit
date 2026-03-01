import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsPositive, IsString } from 'class-validator';
import { SortOrder } from '../recipes.enums';

@InputType()
export class RecipesQueryInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  page: number;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  limit: number;

  @Field(() => String, { nullable: true })
  @IsString()
  searchTerm?: string;

  @Field(() => String, { nullable: true })
  @IsEnum(SortOrder)
  sort?: SortOrder;
}
