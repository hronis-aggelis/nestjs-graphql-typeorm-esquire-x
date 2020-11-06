import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from '../../user/models/user.model';
import { User } from '../../user/user.entity';
import { FreelancerType } from '../../freelancer/models/freelancer.model';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { JobType } from '../../job/models/job.model';
import { Job } from '../../job/job.entity';
import { JobOfferType } from '../../job-offer/models/job-offer.model';
import { JobOffer } from '../../job-offer/job-offer.entity';

@ObjectType('Employer')
export class EmployerType {
  @Field(type => ID)
  employerId: string;

  @Field(type => UserType)
  userEmployer: User;

  @Field(type => [FreelancerType], { nullable: true })
  employerSavedFreelancers: Freelancer[];

  @Field(type => [JobType], { nullable: true })
  jobEmployer: Job[];

  @Field(type => [JobOfferType], { nullable: true })
  jobOfferEmployer: JobOffer[];

  slug?: string;
  modifiedDate: string;
  createdDate: string;
}
