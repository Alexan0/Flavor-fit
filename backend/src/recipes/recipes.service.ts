import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { RecipesQueryInput } from './inputs/get-recipes-query.input';
import { Prisma } from 'prisma/generated/prisma/client';
import { SortOrder } from './recipes.enums';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll({
    page,
    limit,
    searchTerm,
    sort,
    mealType,
    dietaryPreference,
    healthGoal,
    cuisine,
    specialOccasion,
  }: RecipesQueryInput) {
    const skip = (page - 1) * limit;

    const where = {
      ...(mealType && { mealType }),
      ...(dietaryPreference && { dietaryPreference }),
      ...(healthGoal && { healthGoal }),
      ...(cuisine && { cuisine }),
      ...(specialOccasion && { specialOccasion }),
      ...(searchTerm && {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          {
            recipeIngredients: {
              some: {
                ingredient: {
                  name: { contains: searchTerm, mode: 'insensitive' },
                },
              },
            },
          },
        ],
      }),
    } satisfies Prisma.RecipeWhereInput;

    const [items, total] = await Promise.all([
      this.prisma.recipe.findMany({
        skip,
        take: limit,
        where,
        orderBy: this.getOrderBy(sort),
        include: {
          _count: {
            select: { likes: true },
          },
        },
      }),
      this.prisma.recipe.count({ where }),
    ]);

    return {
      items,
      total,
      hasMore: skip + items.length < total,
    };
  }

  async getBySlug(slug: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { slug },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        nutritionFacts: true,
        tags: true,
        recipeSteps: true,
        recipeIngredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${slug} not found`);
    }

    return recipe;
  }

  private getOrderBy(sort?: SortOrder) {
    switch (sort) {
      case SortOrder.RECOMMENDED:
        return { likes: { _count: Prisma.SortOrder.desc } };

      case SortOrder.POPULAR:
        return { views: Prisma.SortOrder.desc };

      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  }
}
