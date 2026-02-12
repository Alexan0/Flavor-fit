import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { IngredientCreateInput } from './inputs/create-ingredients.input';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.ingredient.findMany();
  }

  async getById(id: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    return ingredient;
  }

  async deleteById(id: string) {
    await this.prisma.ingredient.delete({
      where: { id },
    });

    return true;
  }

  create(data: IngredientCreateInput) {
    return this.prisma.ingredient.create({ data });
  }

  async update(id: string, data: IngredientCreateInput) {
    return this.prisma.ingredient.update({ where: { id }, data });
  }
}
