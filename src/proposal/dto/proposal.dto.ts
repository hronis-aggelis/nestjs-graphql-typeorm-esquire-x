import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateProposalInput {
  @Field(() => ID)
  @IsUUID('4')
  jobId: string;

  @Field(type => String, { nullable: true })
  coverLetter: string;

  @Field(type => String, { nullable: true })
  slug: string;
}
