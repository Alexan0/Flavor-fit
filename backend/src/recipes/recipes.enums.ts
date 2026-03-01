import { registerEnumType } from '@nestjs/graphql';

export enum Unit {
  GRAM = 'GRAM',
  MILLILITER = 'MILLILITER',
  PIECE = 'PIECE',
  TEASPOON = 'TEASPOON',
  TABLESPOON = 'TABLESPOON',
  CLOVES = 'CLOVES',
}

registerEnumType(Unit, { name: 'Unit', description: undefined });

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

registerEnumType(Difficulty, { name: 'Difficulty', description: undefined });

export enum SortOrder {
  NEW = 'new',
  RECOMMENDED = 'recommended',
  POPULAR = 'popular',
}

registerEnumType(SortOrder, { name: 'SortOrder', description: undefined });
