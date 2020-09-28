import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserType } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/user.input';
import { User } from './user.entity';
import { UpdateUserInput } from './dto/user-update.input';
import { TokenType } from './models/token.model';
import {
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { GqlAuthGuard } from './auth-jwt-utils/auth.guard';
import { CurrentUser } from './custom-decorators/user.decorator';
import { Freelancer } from 'src/freelancer/freelancer.entity';
import { Employer } from '../employer/employer.entity';

@Resolver(of => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => [UserType])
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(returns => UserType)
  async getUserById(@Args('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Query(returns => UserType)
  @UseGuards(GqlAuthGuard)
  async getMyProfile(@CurrentUser() user: User): Promise<User> {
    return this.userService.getMyProfile(user);
  }

  @Query(returns => TokenType)
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<{ accessToken }> {
    return this.userService.signIn(email, password);
  }

  @Mutation(returns => UserType)
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.createUser(data);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('data') data: UpdateUserInput,
    @CurrentUser() user: User,
  ): Promise<Boolean> {
    return this.userService.updateUser(data, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@CurrentUser() user: User): Promise<Boolean> {
    return this.userService.deleteUser(user);
  }

  @ResolveField()
  async freelancer(@Parent() user: User): Promise<Freelancer> {
    return this.userService.freelancer(user);
  }

  @ResolveField()
  async employer(@Parent() user: User): Promise<Employer> {
    return this.userService.employer(user);
  }
}
