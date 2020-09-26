import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
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

  @Mutation(returns => EmployerType)
  @UseGuards(GqlAuthGuard)
  async deleteEmployer(@CurrentUser() user: User): Promise<Employer> {
    return this.employerService.deleteEmployer(user);
  }

  @ResolveField()
  async userEmployer(@Parent() employer: Employer): Promise<User> {
    return this.employerService.userEmployer(employer);
  }

  @Mutation(returns => EmployerType)
  async assignEmployerSavedFreelancersToEmployer(
    @Args('data') data: AssignEmployerSavedFreelancersToEmployer,
  ): Promise<Employer> {
    return this.employerService.assignEmployerSavedFreelancersToEmployer(data);
  }

  @ResolveField()
  async employerSavedFreelancers(
    @Parent() employer: Employer,
  ): Promise<Freelancer[]> {
    return this.employerService.employerSavedFreelancers(employer);
    //   const result = lesson.students;
    //   return this.studentRepository.find({
    //     where: {
    //       id: {
    //         $in: result,
    //       },
    //     },
    //   });
  }
}
