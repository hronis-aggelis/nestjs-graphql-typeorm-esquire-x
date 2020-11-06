import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { User } from '../../user/user.entity';
import { Employer } from '../../employer/employer.entity';
import { EmployerType } from '../../employer/models/employer.model';
import { JobOfferType } from '../../job-offer/models/job-offer.model';
import { JobOffer } from '../../job-offer/job-offer.entity';

@ObjectType('Job')
export class JobType {
  @Field(type => ID)
  jobId: string;

  @Field(type => Float)
  jobAmount: number;

  @Field(type => Float)
  jobBudget: number;

  @Field(type => EmployerType)
  employerJob: Employer;

  freelancerRated: boolean;
  jobCompleted: boolean;
  jobActive: boolean;
  jobClosed: boolean;
  jobDescription: string;
  jobExperienceLevel: string; //enum
  jobFreelancerCoverLetter?: string;

  @Field(type => Float, { nullable: true })
  jobHoursPerWeek?: number; //enum

  @Field(type => [JobOfferType], { nullable: 'itemsAndList' })
  jobOfferJob: JobOffer[];

  jobNew: boolean;
  jobRated: boolean;
  jobStartDate: string; //date
  jobTitle: string;
  jobType: string; //enum
  jobProjectLength: string; //enum

  slug?: string;
  modifiedDate: string;
  createdDate: string;
}
