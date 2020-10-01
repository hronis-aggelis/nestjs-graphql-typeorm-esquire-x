import { ID, Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateJobInput {
  @Field(type => Float)
  jobAmount: number;

  @Field(type => Float)
  jobBudget: number;

  @Field({ nullable: true })
  slug: string;

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
}
