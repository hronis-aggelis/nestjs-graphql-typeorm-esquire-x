import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateJobOfferInput {
  @Field(type => Float)
  proposedPrice: number;

  @Field(type => Boolean)
  accepted: boolean;

  @Field(type => Boolean)
  alertNewJobOffer: boolean;

  @Field(type => Boolean)
  completed: boolean;

  @Field(type => Boolean)
  employerJobOfferSend: boolean;

  @Field(type => Boolean)
  freelancerSubmittedProposal: boolean;

  @Field(type => Boolean)
  projectRejected: boolean;

  @Field(() => ID) //, { defaultValue: [] })
  @IsUUID('4')
  jobId: string;

  @Field(() => ID)
  @IsUUID('4')
  freelancerId: string;

  @Field(type => String)
  coverLetter: string;

  @Field(type => String)
  title: string;

  @Field(type => String, { nullable: true })
  slug: string;
}
