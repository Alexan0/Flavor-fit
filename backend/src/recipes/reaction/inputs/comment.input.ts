import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CommentCreateInput {
  @Field(() => String)
  @IsString()
  content!: string;

  @Field(() => String)
  @IsString()
  recipeId!: string;
}

@InputType()
export class CommentUpdateInput {
  @Field(() => String)
  @IsString()
  content!: string;
}
