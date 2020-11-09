import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Job } from '../job/job.entity';
import { Chat } from '../chat/chat.entity';

@Entity('Messages')
export class Message {
  @PrimaryColumn()
  messageId: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @Column()
  messageContent: string;

  @ManyToOne(
    type => User,
    user => user.userId,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'userUserId2' })
  messageFrom: User;

  @ManyToOne(
    type => User,
    user => user.userId,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'userUserId1' })
  messageTo: User;

  @ManyToOne(
    type => Chat,
    chat => chat.chatMessages,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  chat: Chat;
}
