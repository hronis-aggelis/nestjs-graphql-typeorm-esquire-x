import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ResolveProperty,
  Context,
} from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { User } from '../user/user.entity';
import { EmployerType } from './models/employer.model';
import { Employer } from './employer.entity';
import { EmployerService } from './employer.service';
import { Freelancer } from '../freelancer/freelancer.entity';
import { CreateEmployerInput } from './dto/employer.input';
import { AssignEmployerSavedFreelancersToEmployer } from './dto/assign-employerSavedFreelancersToEmployer.input';
import { IGraphQLContext } from '../types/graphql.types';

@Resolver(of => EmployerType)
export class EmployerResolver {
  constructor(private employerService: EmployerService) {}

  @Query(returns => [EmployerType])
  async getEmployers(): Promise<Employer[]> {
    return this.employerService.getEmployers();
  }

  @Mutation(returns => EmployerType)
  @UseGuards(GqlAuthGuard)
  async createEmployer(
    @Args('data') data: CreateEmployerInput,
    @CurrentUser() user: User,
  ): Promise<Employer> {
    return this.employerService.createEmployer(data, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteEmployer(@CurrentUser() user: User): Promise<Boolean> {
    return this.employerService.deleteEmployer(user);
  }

  @Mutation(returns => EmployerType)
  @UseGuards(GqlAuthGuard)
  async assignEmployerSavedFreelancersToEmployer(
    @CurrentUser() user: User,
    @Args('data') data: AssignEmployerSavedFreelancersToEmployer,
  ): Promise<Employer> {
    return this.employerService.assignEmployerSavedFreelancersToEmployer(
      user,
      data,
    );
  }

  @ResolveField()
  async userEmployer(@Parent() employer: Employer): Promise<User> {
    return this.employerService.userEmployer(employer);
  }

  // @ResolveField()
  // async employerSavedFreelancers(
  //   @Parent() employer: Employer,
  // ): Promise<Freelancer[]> {
  //   return this.employerService.employerSavedFreelancers(employer);
  // }

  @ResolveField()
  async employerSavedFreelancers(
    @Parent() employer: Employer,
    @Context() { freelancersEmployerLoader }: IGraphQLContext,
  ): Promise<Freelancer[]> {
    return freelancersEmployerLoader.load(employer.employerId);
  }
}
