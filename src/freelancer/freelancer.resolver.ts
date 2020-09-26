import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
// import { GqlAuthGuard } from './auth-jwt-utils/auth.guard';
// import { CurrentUser } from './custom-decorators/user.decorator';
import { FreelancerType } from './models/freelancer.model';
import { FreelancerService } from './freelancer.service';
import { Freelancer } from './freelancer.entity';
import { CreateFreelancerInput } from './dto/freelancer.input';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { User } from '../user/user.entity';
import { ExperienceLevelValidationPipe } from './pipes/freelancerExperienceLevelValidation.pipe';
import { Category } from 'src/category/category.entity';

@Resolver(of => FreelancerType)
export class FreelancerResolver {
  constructor(private freelancerService: FreelancerService) {}
  //constructor(private userService: UserService) {}
  // @Query(returns => [UserType])
  // getUsers(): Promise<User[]> {
  //   return this.userService.getUsers();
  // }
  // @Query(returns => UserType)
  // @UseGuards(GqlAuthGuard)
  // async getMyProfile(@CurrentUser() user: User): Promise<User> {
  //   return this.userService.getMyProfile(user);
  // }
  // @Query(returns => TokenType)
  // async signIn(
  //   @Args('email') email: string,
  //   @Args('password') password: string,
  // ): Promise<{ accessToken }> {
  //   return this.userService.signIn(email, password);
  // }
  @Query(returns => [FreelancerType])
  async getFreelancers(): Promise<Freelancer[]> {
    return this.freelancerService.getFreelancers();
  }

  @Mutation(returns => FreelancerType)
  @UseGuards(GqlAuthGuard)
  async createFreelancer(
    @Args('data', ExperienceLevelValidationPipe) data: CreateFreelancerInput,
    @CurrentUser() user: User,
  ): Promise<Freelancer> {
    return this.freelancerService.createFreelancer(data, user);
  }

  @Mutation(returns => FreelancerType)
  @UseGuards(GqlAuthGuard)
  async deleteFreelancer(@CurrentUser() user: User): Promise<Freelancer> {
    return this.freelancerService.deleteFreelancer(user);
  }

  @ResolveField()
  async user(@Parent() freelancer: Freelancer): Promise<User> {
    return this.freelancerService.user(freelancer);
  }

  @ResolveField()
  async categories(@Parent() freelancer: Freelancer): Promise<Category[]> {
    return this.freelancerService.categories(freelancer);
  }
}
