import { ID, Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateJobInput {
  @Field(type => Float)
  jobAmount: number;

  @Field(type => Float)
  jobBudget: number;

  @Field(type => String, { nullable: true })
  slug: string;

  @Field(type => Boolean)
  freelancerRated: boolean;

  @Field(type => Boolean)
  jobCompleted: boolean;

  @Field(type => Boolean)
  jobActive: boolean;

  @Field(type => Boolean)
  jobClosed: boolean;

  @Field(type => String)
  jobDescription: string;

  @Field(type => String)
  jobExperienceLevel: string; //enum

  @Field(type => String, { nullable: true })
  jobFreelancerCoverLetter: string;

  @Field(type => Float, { nullable: true })
  jobHoursPerWeek: number; //enum

  @Field(type => Boolean)
  jobNew: boolean;

  @Field(type => Boolean)
  jobRated: boolean;

  @Field(type => String)
  jobStartDate: string; //date

  @Field(type => String)
  jobTitle: string;

  @Field(type => String)
  jobType: string; //enum

  @Field(type => String)
  jobProjectLength: string; //enum
}
