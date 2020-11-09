import {
  Resolver,
  Mutation,
  Args,
  Query,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { MessageType } from './models/message.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { CreateMessageInput } from './dto/message.dto';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { User } from '../user/user.entity';
import { PubSub } from 'graphql-subscriptions';
import { Message } from './message.entity';
import { ChatType } from '../chat/models/chat.model';
import { ChatService } from '../chat/chat.service';
import { Chat } from '../chat/chat.entity';

const pubSub = new PubSub();

@Resolver(() => MessageType)
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query(returns => [MessageType])
  @UseGuards(GqlAuthGuard)
  async getMessages(@CurrentUser() user: User): Promise<Message[]> {
    return this.messageService.getMessages(user);
  }

  @Mutation(returns => MessageType)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @CurrentUser() user: User,
    @Args('data') data: CreateMessageInput,
  ): Promise<Message> {
    const newMessage = await this.messageService.createMessage(data, user);

    pubSub.publish('messagedAdded', { messagedAdded: newMessage });

    return newMessage;
  }

  @ResolveField()
  async chat(@Parent() message: Message): Promise<Chat> {
    // return this.chatService.getChatByMessage(message);
    return this.messageService.chat(message);
  }

  @Subscription(returns => MessageType, {
    filter: (payload, variables, ctx) =>
      payload.messagedAdded.messageTo.userId === ctx.req.user.userId,
  })
  @UseGuards(GqlAuthGuard)
  async messagedAdded(@CurrentUser() user: User) {
    return pubSub.asyncIterator('messagedAdded');
  }
}
