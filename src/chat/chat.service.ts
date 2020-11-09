import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { User } from '../user/user.entity';
import { In } from 'typeorm/find-options/operator/In';
import { Chat } from './chat.entity';
import { Message } from '../message/message.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRepository) private chatRepository: ChatRepository,
  ) {}

  async createChat(userFrom: User, userTo: User) {
    const chat = {
      chatId: uuid(),
      //conversationParties: [userFrom, userTo],
      userA: userFrom,
      userB: userTo,
      modifiedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      slug: 'oeo',
    };

    return this.chatRepository.save(chat);
  }

  async updateChat(chat: Chat, message: Message) {
    chat.chatMessages.push(message);
    this.chatRepository.update(chat.chatId, {
      chatMessages: chat.chatMessages,
      modifiedDate: new Date().toISOString(),
    });
  }

  async getChat(messageFrom: User, messageTo: User) {
    // return this.chatRepository.findOne({
    //   where: { conversationParties: [messageFrom, messageTo] },
    // });
    return this.chatRepository.findOne({
      where: [{ userA: messageFrom }, { userB: messageTo }],
    });
  }

  async chatMessages(chat: Chat): Promise<Message[]> {
    const fullChat = await this.chatRepository.findOne(chat.chatId, {
      relations: ['chatMessages'],
    });
    return fullChat.chatMessages;
  }

  // async getChatByMessage(message: Message) {
  //   return this.chatRepository.findOne({
  //     where: {
  //       chatMessages: [message],
  //     },
  //   });
  //   // return this.chatRepository
  //   //   .createQueryBuilder('chat')
  //   //   .where('chat.chatMessages like :chatMessages', {
  //   //     chatMessages: `%"${message}"%`,
  //   //   })
  //   //   .getOne();
  // }
}
