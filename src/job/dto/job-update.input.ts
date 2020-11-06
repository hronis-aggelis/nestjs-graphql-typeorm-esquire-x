import { PartialType, InputType } from '@nestjs/graphql';
import { CreateJobInput } from './job.input';

@InputType()
export class UpdateJobInput extends PartialType(CreateJobInput) {}
