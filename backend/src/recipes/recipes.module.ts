import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { IngredientsModule } from './ingredients/ingredients.module';
import { AdminRecipesService } from './admin-recipes.service';
import { PrismaModule } from '@prisma/prisma.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  providers: [RecipesResolver, RecipesService, AdminRecipesService],
  imports: [IngredientsModule, PrismaModule, ReactionModule],
})
export class RecipesModule {}
