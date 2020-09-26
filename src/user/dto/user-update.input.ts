import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
