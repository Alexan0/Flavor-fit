import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, { name: 'Role', description: undefined });

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHT = 'LIGHT',
  MODERATE = 'MODERATE',
  ACTIVE = 'ACTIVE',
  VERY_ACTIVE = 'VERY_ACTIVE',
}

registerEnumType(ActivityLevel, {
  name: 'ActivityLevel',
  description: undefined,
});

export enum NutritionGoal {
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  MAINTENANCE = 'MAINTENANCE',
  MUSCLE_GAIN = 'MUSCLE_GAIN',
}

registerEnumType(NutritionGoal, {
  name: 'NutritionGoal',
  description: undefined,
});

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(Gender, { name: 'Gender', description: undefined });
