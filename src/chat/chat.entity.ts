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
import { Message } from '../message/message.entity';

@Entity('Chats')
export class Chat {
  @PrimaryColumn()
  chatId: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @OneToMany(
    type => Message,
    message => message.chat,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  //@Column('text', { array: true, nullable: true })
  chatMessages: Message[];

  // // @OneToMany(
  // //   type => User,
  // //   user => user.userId,
  // //   { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  // // )
  // @Column('text', { array: true })
  // conversationParties: User[];

  @OneToOne(
    type => User,
    user => user.userId,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'userUserId1' })
  userA: User;

  @OneToOne(
    type => User,
    user => user.userId,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'userUserId2' })
  userB: User;
}
