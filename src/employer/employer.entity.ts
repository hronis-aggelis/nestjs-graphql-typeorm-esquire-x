import {
  Entity,
  PrimaryColumn,
  Column,
  ObjectIdColumn,
  ObjectID,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Freelancer } from '../freelancer/freelancer.entity';

@Entity('employers')
export class Employer {
  @PrimaryColumn()
  employerId: string;

  @Column('text', { nullable: true, array: true })
  employerSavedFreelancers?: string[];

  @Column({ nullable: true })
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @OneToOne(type => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userEmployer: User;

  @Column()
  userEmployerUserId: string;
}
