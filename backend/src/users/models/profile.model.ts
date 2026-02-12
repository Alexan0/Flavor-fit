import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Gender } from '../users.enums';

@ObjectType()
export class ProfileModel {
  @Field(() => ID)
  id?: string;

  @Field(() => String, { nullable: true })
  fullName?: string;

  @Field(() => Gender, { nullable: true })
  gender?: `${Gender}` | null;

  @Field(() => Int, { nullable: true })
  age?: number | null;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
