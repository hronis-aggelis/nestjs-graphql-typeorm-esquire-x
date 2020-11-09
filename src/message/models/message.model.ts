import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { User } from '../../user/user.entity';
import { UserType } from '../../user/models/user.model';
import { ChatType } from '../../chat/models/chat.model';
import { Chat } from '../../chat/chat.entity';

@ObjectType('Message')
export class MessageType {
  @Field(type => ID)
  messageId: string;

  @Field(type => ChatType)
  chat: Chat;

  @Field(type => UserType)
  messageFrom: User;

  @Field(type => UserType)
  messageTo: User;

  messageContent: string;
  slug?: string;
  modifiedDate: string;
  createdDate: string;
}
