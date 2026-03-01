import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsString, IsPositive, ArrayNotEmpty, IsEnum } from 'class-validator';
import { OrderStatus } from '../orders.enums';

@InputType()
export class OrderItemInput {
  @Field(() => ID)
  @IsString()
  recipeIngredientId!: string;

  @Field(() => Float, { defaultValue: 1 })
  @IsPositive()
  quantity!: number;
}

@InputType()
export class OrderCreateInput {
  @Field(() => [OrderItemInput])
  @ArrayNotEmpty()
  items!: OrderItemInput[];
}

@InputType()
export class OrderUpdateStatusInput {
  @Field(() => OrderStatus)
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
