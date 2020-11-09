import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field(() => ID)
  @IsUUID('4')
  messageTo: string;

  @Field(type => String)
  @MinLength(1)
  messageContent: string;

  @Field(type => String, { nullable: true })
  slug: string;
}
