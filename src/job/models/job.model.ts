import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { User } from '../../user/user.entity';

@ObjectType('Job')
export class JobType {
  @Field(type => ID)
  jobId: string;

  @Field(type => Float)
  jobAmount: number;

  @Field(type => Float)
  jobBudget: number;

  // @Field(type => User)
  // userJob: User;

  freelancerRated: boolean;
  jobCompleted: boolean;
  jobActive: boolean;
  jobClosed: boolean;
  jobDescription: string;
  jobExperienceLevel: string; //enum
  jobFreelancerCoverLetter?: string;
  jobHoursPerWeek?: number; //enum
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
