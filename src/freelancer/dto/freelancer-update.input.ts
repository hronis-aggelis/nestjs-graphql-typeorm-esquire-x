import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateFreelancerInput } from './freelancer.input';

@InputType()
export class UpdateFreelancerInput extends PartialType(CreateFreelancerInput) {}
