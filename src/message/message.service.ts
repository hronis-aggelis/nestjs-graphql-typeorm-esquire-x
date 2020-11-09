import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessageInput } from './dto/message.dto';
import { User } from '../user/user.entity';
import { v4 as uuid } from 'uuid';
import { ChatService } from '../chat/chat.service';
import { UserService } from '../user/user.service';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../chat/chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private messageRepository: MessageRepository,
    @Inject(forwardRef(() => ChatService)) private chatService: ChatService,
    private userService: UserService,
  ) {}

  async createMessage(data: CreateMessageInput, user: User): Promise<Message> {
    const { messageContent, messageTo, slug } = data;
    const userTo = await this.userService.getUserById(messageTo);
    if (!userTo) {
      throw new NotFoundException('User not found!!');
    }

    const chat = await this.chatService.getChat(user, userTo);

    if (chat) {
      const message = {
        messageId: uuid(),
        messageContent,
        userTo,
        messageFrom: user,
        modifiedDate: new Date().toISOString(),
        createdDate: new Date().toISOString(),
        slug,
        chat,
      };

      const savedMessage = await this.messageRepository.save(message);

      await this.chatService.updateChat(chat, savedMessage);
      return savedMessage;
    } else {
      const newChat = await this.chatService.createChat(user, userTo);
      const message = {
        messageId: uuid(),
        messageContent,
        messageTo: userTo,
        messageFrom: user,
        modifiedDate: new Date().toISOString(),
        createdDate: new Date().toISOString(),
        slug,
        chat: newChat,
      };
      return this.messageRepository.save(message);
    }
  }

  async chat(message: Message): Promise<Chat> {
    const fullMessage = await this.messageRepository.findOne(
      message.messageId,
      { relations: ['messageFrom', 'messageTo'] },
    );
    //console.log(fullMessage);
    return this.chatService.getChat(fullMessage.messageFrom, message.messageTo);
  }

  async getMessages(user: User): Promise<Message[]> {
    return this.messageRepository.find({
      where: {
        messageTo: user,
      },
    });
  }
}
