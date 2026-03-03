import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../users.enums';
import { ProfileModel } from './profile.model';
import { BodyMeasurementModel } from './body-measurement.model';

@ObjectType()
export class UserModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => Role, { defaultValue: 'USER', nullable: false })
  role!: `${Role}`;

  @Field(() => Boolean)
  isEmailVerified!: boolean;

  @Field(() => ProfileModel, { nullable: true })
  profile?: ProfileModel | null;

  @Field(() => BodyMeasurementModel, { nullable: true })
  measurements?: BodyMeasurementModel | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
