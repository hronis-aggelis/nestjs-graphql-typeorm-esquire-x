import { Resolver, ResolveField, Parent, Query } from '@nestjs/graphql';
import { ChatType } from './models/chat.model';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { Message } from '../message/message.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { User } from '../user/user.entity';

@Resolver(() => ChatType)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Query(returns => [ChatType])
  @UseGuards(GqlAuthGuard)
  async getChats(@CurrentUser() user: User): Promise<Chat[]> {
    return this.chatService.getChats(user);
  }

  @ResolveField()
  async chatMessages(@Parent() chat: Chat): Promise<Message[]> {
    // return this.chatService.getChatByMessage(message);
    return this.chatService.chatMessages(chat);
  }
}
