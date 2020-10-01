import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { JobType } from './models/job.model';
import { JobService } from './job.service';
import { CreateJobInput } from './dto/job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { User } from '../user/user.entity';
import { Job } from './job.entity';

@Resolver(of => JobType)
export class JobResolver {
  constructor(private jobService: JobService) {}

  @Mutation(returns => JobType)
  @UseGuards(GqlAuthGuard)
  async createJob(
    @Args('data') data: CreateJobInput,
    @CurrentUser() user: User,
  ): Promise<Job> {
    return this.jobService.createJob(data, user);
  }
}
