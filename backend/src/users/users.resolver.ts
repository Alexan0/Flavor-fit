import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CurrentUser } from '@auth/decorators/current-user-decorator';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from 'prisma/generated/prisma/enums';
import { UserModel } from '@users/models/user.model';
import { UserUpdateInput } from './inputs/user-update.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel, { name: 'profile' })
  @Auth()
  getProfile(@CurrentUser('id') id: string) {
    return this.usersService.getById(id);
  }

  @Mutation(() => UserModel)
  @Auth()
  updateProfile(
    @CurrentUser('id') id: string,
    @Args('data') input: UserUpdateInput,
  ) {
    return this.usersService.updateProfile(id, input);
  }

  @Query(() => [UserModel], { name: 'users' })
  @Auth(Role.ADMIN)
  getAllUsers() {
    return this.usersService.getAll();
  }
}
