import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RecipesService } from './recipes.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from 'prisma/generated/prisma/enums';
import { AdminRecipesService } from './admin-recipes.service';
import { RecipeCreateInput } from './inputs/recipe.input';
import { RecipeModel } from './models/recipe.model';
import { CurrentUser } from '@auth/decorators/current-user-decorator';
import { RecipesQueryInput } from './inputs/get-recipes-query.input';

@Resolver()
export class RecipesResolver {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly adminRecipesService: AdminRecipesService,
  ) {}

  @Query(() => [RecipeModel], { name: 'recipes' })
  getAll(@Args('input') input: RecipesQueryInput) {
    return this.recipesService.getAll(input);
  }

  @Query(() => RecipeModel, { name: 'recipeBySlug' })
  getBySlug(@Args('slug') slug: string) {
    return this.recipesService.getBySlug(slug);
  }

  @Query(() => [RecipeModel], { name: 'adminRecipes' })
  @Auth(Role.ADMIN)
  getAllAdmin() {
    return this.adminRecipesService.getAll();
  }

  @Query(() => RecipeModel, { name: 'recipeById' })
  @Auth(Role.ADMIN)
  getById(@Args('id') id: string) {
    return this.adminRecipesService.getById(id);
  }

  @Mutation(() => Boolean)
  @Auth(Role.ADMIN)
  deleteIngredientById(@Args('id') id: string) {
    return this.adminRecipesService.deleteById(id);
  }

  @Mutation(() => RecipeModel)
  @Auth(Role.ADMIN)
  createIngredient(
    @CurrentUser('id') authorId: string,
    @Args('input') input: RecipeCreateInput,
  ) {
    return this.adminRecipesService.create(authorId, input);
  }

  @Mutation(() => RecipeModel)
  @Auth(Role.ADMIN)
  updateIngredient(
    @Args('id') id: string,
    @Args('input') input: RecipeCreateInput,
  ) {
    return this.adminRecipesService.update(id, input);
  }
}
