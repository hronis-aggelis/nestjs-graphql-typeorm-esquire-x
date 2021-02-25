import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JobType } from './models/job.model';
import { JobService } from './job.service';
import { CreateJobInput } from './dto/job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { User } from '../user/user.entity';
import { Job } from './job.entity';
import { UpdateJobInput } from './dto/job-update.input';
import { Employer } from '../employer/employer.entity';
import { Freelancer } from '../freelancer/freelancer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FreelancerRepository } from '../freelancer/freelancer.repository';
import { JobOffer } from '../job-offer/job-offer.entity';

@Resolver(of => JobType)
export class JobResolver {
  constructor(
    private jobService: JobService,
    @InjectRepository(FreelancerRepository)
    private freelancerRepository: FreelancerRepository,
  ) {}

  @Query(returns => [JobType])
  async getJobs(): Promise<Job[]> {
    return this.jobService.getJobs();
  }

  @Mutation(returns => JobType)
  @UseGuards(GqlAuthGuard)
  async createJob(
    @Args('data') data: CreateJobInput,
    @CurrentUser() user: User,
  ): Promise<Job> {
    return this.jobService.createJob(data, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateJob(
    @Args('data') data: UpdateJobInput,
    @Args('jobId') jobId: string,
    @CurrentUser() user: User,
  ): Promise<Boolean> {
    return this.jobService.updateJob(data, jobId, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteJob(
    @CurrentUser() user: User,
    @Args('jobId') jobId: string,
  ): Promise<Boolean> {
    return this.jobService.deleteJob(user, jobId);
  }

  @ResolveField()
  async freelancerJob(@Parent() job: Job): Promise<Freelancer> {
    return this.jobService.freelancerJob(job);
  }

  @ResolveField()
  async jobOfferJob(@Parent() job: Job): Promise<JobOffer[]> {
    return this.jobService.jobOfferJob(job);
  }
}
