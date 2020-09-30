import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { FreelancerType } from '../../freelancer/models/freelancer.model';

@InputType()
export class CreateEmployerInput {
  @Field({ nullable: true })
  slug: string;

  // @Field(() => [ID], { defaultValue: [] })
  // @IsUUID('4', { each: true })
  // employerSavedFreelancers: string[];
  // @Field(type => [FreelancerType], { nullable: true })
  // employerSavedFreelancers: Freelancer[];
}
