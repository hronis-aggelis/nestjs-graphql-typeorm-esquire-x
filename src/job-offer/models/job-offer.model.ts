import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { User } from '../../user/user.entity';
import { Employer } from '../../employer/employer.entity';
import { EmployerType } from '../../employer/models/employer.model';
import { JobType } from '../../job/models/job.model';
import { Job } from '../../job/job.entity';
import { FreelancerType } from '../../freelancer/models/freelancer.model';
import { Freelancer } from '../../freelancer/freelancer.entity';

@ObjectType('JobOffer')
export class JobOfferType {
  @Field(type => ID)
  jobOfferId: string;

  @Field(type => Float)
  proposedPrice: number;

  @Field(type => EmployerType)
  employerJobOffer: Employer;

  @Field(type => FreelancerType)
  freelancerJobOffer: Freelancer;

  @Field(type => JobType)
  jobJobOffer: Job;

  accepted: boolean;
  alertNewJobOffer: boolean;
  completed: boolean;
  employerJobOfferSend: boolean;
  freelancerSubmittedProposal: boolean;
  projectRejected: boolean;
  coverLetter: string;
  title: string;
  slug?: string;
  modifiedDate: string;
  createdDate: string;
}
