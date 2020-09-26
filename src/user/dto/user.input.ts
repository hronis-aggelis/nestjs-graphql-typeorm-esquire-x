import { Unique, MaxKey } from 'typeorm';
import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  default_card_ID: string;

  @Field()
  emailTemp: string;

  @Field()
  @MinLength(1)
  firstName: string;

  @Field()
  @MinLength(1)
  lastName: string;

  @Field()
  isEmployer: boolean;

  @Field()
  notification: boolean;

  @Field()
  StripeCostumerID: string;

  @Field()
  userAdmin: boolean;

  @Field()
  @MinLength(8)
  email: string;

  @Field()
  slug: string;

  @Field()
  @MinLength(8)
  password: string;
}
