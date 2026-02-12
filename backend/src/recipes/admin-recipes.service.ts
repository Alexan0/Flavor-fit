import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import type { RecipeCreateInput } from './inputs/recipe.input';

@Injectable()
export class AdminRecipesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.ingredient.findMany();
  }

  async getById(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  async deleteById(id: string) {
    await this.prisma.recipe.delete({
      where: { id },
    });

    return true;
  }

  create(
    authorId: string,
    {
      recipeSteps,
      nutritionFact,
      ingredients,
      tags,
      ...data
    }: RecipeCreateInput,
  ) {
    return this.prisma.recipe.create({
      data: {
        ...data,
        author: {
          connect: { id: authorId },
        },
        ...(!!nutritionFact && {
          nutritionFacts: {
            create: nutritionFact,
          },
        }),
        recipeSteps: {
          create: recipeSteps,
        },
        ...(!!ingredients?.length && {
          recipeIngredients: {
            create: ingredients.map((item, index) => ({
              ingredientId: item.ingredientId,
              name: 'Ingredient',
              quantity: item.quantity,
              unit: item.unit,
              order: index,
            })),
          },
        }),
        ...(!!tags?.length && {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        }),
      },
    });
  }

  async update(
    id: string,
    {
      recipeSteps,
      nutritionFact,
      ingredients,
      tags,
      ...data
    }: RecipeCreateInput,
  ) {
    return this.prisma.recipe.update({
      where: { id },
      data: {
        ...data,
        ...(nutritionFact && {
          nutritionFacts: {
            create: nutritionFact,
            update: nutritionFact,
          },
        }),
        ...(recipeSteps && {
          recipeSteps: {
            deleteMany: {},
            create: recipeSteps.map((step) => ({
              order: step.order,
              title: step.title,
              description: step.description,
            })),
          },
        }),
        ...(ingredients && {
          recipeIngredients: {
            deleteMany: {},
            create: ingredients.map((item, index) => ({
              name: 'Ingredient',
              ingredientId: item.ingredientId,
              quantity: item.quantity,
              unit: item.unit,
              order: index,
            })),
          },
        }),
        ...(tags && {
          tags: {
            set: [],
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        }),
      },
    });
  }
}
