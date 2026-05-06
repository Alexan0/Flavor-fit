import { hash } from 'argon2';
import { Role } from '../prisma/generated/prisma/enums';
import { popularRecipes, recommendedRecipes } from './recipe-seed.data';
import type { ISeedRecipe } from './seed.types';

import 'dotenv/config';

import { PrismaClient } from '../prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter, log: ['error', 'warn'] });

async function cleanupData() {
  await prisma.$transaction([
    prisma.like.deleteMany(),
    prisma.recipeStep.deleteMany(),
    prisma.recipeIngredient.deleteMany(),
    prisma.nutritionFact.deleteMany(),
    prisma.recipe.deleteMany(),
    prisma.ingredient.deleteMany(),
  ]);
}

async function ensureLikerPool(maxLikesCount: number) {
  const likerEmails = Array.from({ length: maxLikesCount }, (_, index) => ({
    email: `seed.liker.${index + 1}@flavorfit.com`,
    password: 'seed-liked-password',
  }));

  const hashedPassword = await hash('seed-liked-password');

  await prisma.user.createMany({
    data: likerEmails.map((item) => ({
      email: item.email,
      password: hashedPassword,
      role: Role.USER,
      isEmailVerified: true,
    })),
    skipDuplicates: true,
  });

  const users = await prisma.user.findMany({
    where: {
      email: {
        startsWith: 'seed.liker.',
      },
    },
    select: {
      id: true,
      email: true,
    },
    orderBy: {
      email: 'asc',
    },
  });

  return users.map((user) => user.id);
}

function buildIngredientCreateData(
  item: ISeedRecipe['recipeIngredients'][number],
) {
  return {
    name: item.name,
    content: `${item.name} ingredient`,
    iconUrl: `images/ingredients/${item.icon}`,
    price: item.priceUsd,
  };
}

async function ensureIngredientId(
  item: ISeedRecipe['recipeIngredients'][number],
) {
  const existingIngredient = await prisma.ingredient.findFirst({
    where: {
      name: item.name,
    },
    select: {
      id: true,
    },
  });

  if (existingIngredient) {
    return existingIngredient.id;
  }

  const createdIngredient = await prisma.ingredient.create({
    data: buildIngredientCreateData(item),
    select: {
      id: true,
    },
  });

  return createdIngredient.id;
}

async function upsertRecipe(recipe: ISeedRecipe, authorId: string) {
  const recipeIngredients = await Promise.all(
    recipe.recipeIngredients.map(async (item) => ({
      name: item.name,
      quantity: Number(item.quantity),
      unit: item.unit,
      ingredient: {
        connect: {
          id: await ensureIngredientId(item),
        },
      },
    })),
  );

  return prisma.recipe.upsert({
    where: {
      slug: recipe.slug,
    },
    update: {
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      calories: recipe.calories,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      mealType: recipe.mealType,
      dietaryPreference: recipe.dietaryPreference,
      healthGoal: recipe.healthGoal,
      cuisine: recipe.cuisine,
      specialOccasion: recipe.specialOccasion,
      views: recipe.views,

      tags: {
        set: [],
        connectOrCreate: recipe.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },

      nutritionFacts: {
        upsert: {
          create: {
            proteins: recipe.nutritionFact.proteins,
            fats: recipe.nutritionFact.fats,
            carbohydrates: recipe.nutritionFact.carbohydrates,
            fiber: recipe.nutritionFact.fiber,
          },
          update: {
            proteins: recipe.nutritionFact.proteins,
            fats: recipe.nutritionFact.fats,
            carbohydrates: recipe.nutritionFact.carbohydrates,
            fiber: recipe.nutritionFact.fiber,
          },
        },
      },

      recipeSteps: {
        deleteMany: {},
        create: recipe.recipeSteps.map((step) => ({
          order: step.order,
          title: step.title,
          description: step.description,
          image: step.image,
        })),
      },

      recipeIngredients: {
        deleteMany: {},
        create: recipeIngredients,
      },
    },
    create: {
      slug: recipe.slug,
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      calories: recipe.calories,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      mealType: recipe.mealType,
      dietaryPreference: recipe.dietaryPreference,
      healthGoal: recipe.healthGoal,
      cuisine: recipe.cuisine,
      specialOccasion: recipe.specialOccasion,
      views: recipe.views,
      authorId,

      tags: {
        connectOrCreate: recipe.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },

      nutritionFacts: {
        create: {
          proteins: recipe.nutritionFact.proteins,
          fats: recipe.nutritionFact.fats,
          carbohydrates: recipe.nutritionFact.carbohydrates,
          fiber: recipe.nutritionFact.fiber,
        },
      },

      recipeSteps: {
        create: recipe.recipeSteps.map((step) => ({
          order: step.order,
          title: step.title,
          description: step.description,
          image: step.image,
        })),
      },

      recipeIngredients: {
        create: recipeIngredients,
      },
    },
  });
}

async function syncRecipeLikes(
  recipeId: string,
  likesCount: number,
  likerIds: string[],
) {
  await prisma.like.deleteMany({
    where: {
      recipeId,
    },
  });

  if (likesCount <= 0) return;

  await prisma.like.createMany({
    data: likerIds.slice(0, likesCount).map((userId) => ({
      userId,
      recipeId,
    })),
    skipDuplicates: true,
  });
}

async function ensureAuthor() {
  const authorEmail = 'seed.author@flavorfit.com';

  let author = await prisma.user.findUnique({
    where: { email: authorEmail },
    select: { id: true },
  });

  if (!author) {
    author = await prisma.user.create({
      data: {
        email: authorEmail,
        password: await hash('author-password'),
        role: Role.ADMIN,
        isEmailVerified: true,
      },
      select: { id: true },
    });
  }

  return author.id;
}

async function seedRecipes(authorId: string, likerIds: string[]) {
  const recommendedSorted = [...recommendedRecipes].sort(
    (a, b) => b.likesCount - a.likesCount,
  );

  const popularSorted = [...popularRecipes].sort((a, b) => b.views - a.views);

  const allRecipes = [...recommendedSorted, ...popularSorted];

  for (const recipe of allRecipes) {
    const createdRecipe = await upsertRecipe(recipe, authorId);
    await syncRecipeLikes(createdRecipe.id, recipe.likesCount, likerIds);
  }
}

async function main() {
  const authorId = await ensureAuthor();
  const allRecipes = [...recommendedRecipes, ...popularRecipes];
  const maxLikesCount = Math.max(...allRecipes.map((r) => r.likesCount));
  const likerIds = await ensureLikerPool(maxLikesCount);

  await cleanupData();
  await seedRecipes(authorId, likerIds);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
