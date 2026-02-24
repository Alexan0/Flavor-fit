import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '@users/models/user.model';

export type TCurrentUser = Omit<UserModel, 'password'>;

export type TRequestWithUser = {
  user?: TCurrentUser;
};

export type TAuthTokenData = Pick<UserModel, 'id' | 'role'>;

@ObjectType()
export class AuthResponse {
  @Field(() => UserModel)
  user: UserModel;
}
