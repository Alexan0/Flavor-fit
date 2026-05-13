import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserModel } from '@users/models/user.model';

@ObjectType()
export class CommentModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  content!: string;

  @Field(() => UserModel, { nullable: false })
  author!: UserModel;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
