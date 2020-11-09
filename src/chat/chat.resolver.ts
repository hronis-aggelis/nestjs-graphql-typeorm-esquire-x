import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ChatType } from './models/chat.model';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { Message } from '../message/message.entity';

@Resolver(() => ChatType)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @ResolveField()
  async chatMessages(@Parent() chat: Chat): Promise<Message[]> {
    // return this.chatService.getChatByMessage(message);
    return this.chatService.chatMessages(chat);
  }
}
