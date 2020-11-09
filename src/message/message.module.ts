import { Module, forwardRef } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { ChatModule } from '../chat/chat.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageRepository]),
    forwardRef(() => ChatModule),
    UserModule,
  ],
  providers: [MessageResolver, MessageService],
  exports: [MessageService],
})
export class MessageModule {}
