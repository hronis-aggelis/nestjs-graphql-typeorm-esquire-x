import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { User } from '../../user/user.entity';
import { MessageType } from '../../message/models/message.model';
import { UserType } from '../../user/models/user.model';
import { Message } from '../../message/message.entity';

@ObjectType('Chat')
export class ChatType {
  @Field(type => ID)
  chatId: string;

  @Field(type => [MessageType], { nullable: true })
  chatMessages: Message[];

  // @Field(type => [UserType])
  // conversationParties: User[];

  @Field(type => UserType)
  userA: User;

  @Field(type => UserType)
  userB: User;

  slug?: string;
  modifiedDate: string;
  createdDate: string;
}
