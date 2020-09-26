import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateEmployerInput {
  @Field({ nullable: true })
  slug: string;

  @Field(() => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  employerSavedFreelancers: string[];
}
