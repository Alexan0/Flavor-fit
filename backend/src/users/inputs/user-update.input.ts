import { Field, InputType } from '@nestjs/graphql';
import { ProfileUpdateInput } from './profile-update.input';
import { BodyMeasurementUpdateInput } from './body-measurement-update-user.input';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class UserUpdateInput {
  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(6)
  password?: string;

  @Field(() => ProfileUpdateInput, { nullable: true })
  profile?: ProfileUpdateInput;

  @Field(() => BodyMeasurementUpdateInput, {
    nullable: true,
  })
  measurements?: BodyMeasurementUpdateInput;
}
