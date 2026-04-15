import { Field, Float, InputType } from '@nestjs/graphql';
import { Unit } from '@src/recipes/recipes.enums';
import { IsEnum, IsPositive, IsString } from 'class-validator';

@InputType()
export class IngredientCreateInput {
  @Field(() => String, { nullable: false })
  @IsString()
  name!: string;

  @Field(() => Unit, { nullable: true })
  @IsEnum(Unit)
  defaultUnit!: Unit;

  @Field(() => Float, { nullable: false })
  @IsPositive()
  price!: number;

  @Field(() => String)
  @IsString()
  iconUrl!: string;

  @Field(() => String)
  @IsString()
  content!: string;
}
