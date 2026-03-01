import { Field, InputType, Int } from '@nestjs/graphql';
import { Gender } from '../users.enums';
import { IsEnum, IsPositive, IsString } from 'class-validator';

@InputType()
export class ProfileUpdateInput {
  @Field(() => String, { nullable: true })
  @IsString()
  fullName?: string;

  @Field(() => Gender, { nullable: true })
  @IsEnum(Gender)
  gender?: Gender | null;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  age?: number | null;

  @Field(() => String, { nullable: true })
  @IsString()
  bio?: string | null;
}
