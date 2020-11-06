import { Resolver, Mutation, Query, Args, Subscription } from '@nestjs/graphql';
import { JobOfferType } from './models/job-offer.model';
import { JobOfferService } from './job-offer.service';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { JobOffer } from './job-offer.entity';
import { User } from '../user/user.entity';
import { CreateJobOfferInput } from './dto/job-offer.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(of => JobOfferType)
export class JobOfferResolver {
  constructor(private jobOfferService: JobOfferService) {}

  @Query(returns => [JobOfferType])
  async getJobOffers(): Promise<JobOffer[]> {
    return this.jobOfferService.getJobOffers();
  }

  @Mutation(returns => JobOfferType)
  @UseGuards(GqlAuthGuard)
  async createJobOffer(
    @Args('data') data: CreateJobOfferInput,
    @CurrentUser() user: User,
  ): Promise<JobOffer> {
    //return this.jobOfferService.createJobOffer(data, user);
    const jobOffer = await this.jobOfferService.createJobOffer(data, user);
    pubSub.publish('jobOfferAdded', { jobOfferAdded: jobOffer });

    return jobOffer;
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteJobOffer(
    @Args('jobOfferId') jobOfferId: string,
    @CurrentUser() user: User,
  ): Promise<Boolean> {
    return this.jobOfferService.deleteJobOffer(jobOfferId, user);
  }

  @Subscription(returns => JobOfferType, {
    filter: (payload, variables, ctx) =>
      payload.jobOfferAdded.freelancerJobOffer.freelancerId ===
      ctx.req.user.freelancer.freelancerId, //variables.freelancerId,
  })
  @UseGuards(GqlAuthGuard)
  async jobOfferAdded(
    @CurrentUser() user: User,
    @Args('freelancerId', {
      nullable: true,
      defaultValue: '',
    })
    freelancerId: string,
  ) {
    return pubSub.asyncIterator('jobOfferAdded');
  }
}