import {
  Entity,
  PrimaryColumn,
  Column,
  ObjectIdColumn,
  ObjectID,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Freelancer } from '../freelancer/freelancer.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  default_card_ID: string;

  @Column()
  emailTemp: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isEmployer: boolean;

  @Column()
  notification: boolean;

  @Column()
  StripeCostumerID: string;

  @Column()
  userAdmin: boolean;

  @Column()
  email: string;

  @Column()
  slug: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  // @OneToOne(
  //   type => Freelancer,
  //   freelancer => freelancer.freelancerId,
  //   { onDelete: 'CASCADE' },
  // )
  // @JoinColumn({ name: 'freelancerFreelancerId' })
  // freelancer: Freelancer;

  // @OneToOne(
  //   type => Freelancer,
  //   {
  //     onDelete: 'CASCADE',
  //   }, //,
  //   //freelancer => freelancer.user.userId,
  // )
  // @JoinColumn()
  // freelancer: Freelancer;
}
