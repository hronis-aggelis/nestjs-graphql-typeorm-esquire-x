import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateJobOfferInput } from './job-offer.input';

@InputType()
export class UpdateJobOfferInput extends PartialType(CreateJobOfferInput) {}
