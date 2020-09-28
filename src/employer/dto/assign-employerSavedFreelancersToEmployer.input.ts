import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AssignEmployerSavedFreelancersToEmployer {
  // @Field(type => ID)
  // employerId: string;

  @Field(type => [ID])
  freelancersId: string[];
}
