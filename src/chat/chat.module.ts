import { Module, forwardRef } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './chat.repository';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRepository]),
    forwardRef(() => MessageModule),
  ],
  providers: [ChatResolver, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
