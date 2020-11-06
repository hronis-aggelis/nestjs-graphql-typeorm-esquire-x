import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, UsePipes, Inject, forwardRef } from '@nestjs/common';
import { FreelancerType } from './models/freelancer.model';
import { FreelancerService } from './freelancer.service';
import { Freelancer } from './freelancer.entity';
import { CreateFreelancerInput } from './dto/freelancer.input';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { User } from '../user/user.entity';
import { ExperienceLevelValidationPipe } from './pipes/freelancerExperienceLevelValidation.pipe';
import { Category } from 'src/category/category.entity';
import { UpdateFreelancerInput } from './dto/freelancer-update.input';
import { Employer } from '../employer/employer.entity';
import { JobOffer } from '../job-offer/job-offer.entity';
import { JobOfferService } from '../job-offer/job-offer.service';

@Resolver(of => FreelancerType)
export class FreelancerResolver {
  constructor(
    private freelancerService: FreelancerService,
    @Inject(forwardRef(() => JobOfferService))
    private jobOfferService: JobOfferService,
  ) {}

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

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateFreelancer(
    @Args('data') data: UpdateFreelancerInput,
    @CurrentUser() user: User,
  ): Promise<Boolean> {
    return this.freelancerService.updateFreelancer(data, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteFreelancer(@CurrentUser() user: User): Promise<Boolean> {
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

  @ResolveField()
  async savedByThoseEmployers(
    @Parent() freelancer: Freelancer,
  ): Promise<Employer[]> {
    return this.freelancerService.savedByThoseEmployers(freelancer);
  }

  @ResolveField()
  async jobOfferFreelancer(
    @Parent() freelancer: Freelancer,
  ): Promise<JobOffer[]> {
    return this.jobOfferService.getJobOfferByFreelancerId(freelancer);
  }
}
