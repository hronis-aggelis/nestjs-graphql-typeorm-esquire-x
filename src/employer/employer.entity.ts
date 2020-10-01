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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Freelancer } from '../freelancer/freelancer.entity';

@Entity('employers')
export class Employer {
  @PrimaryColumn()
  employerId: string;

  // @Column('text', { nullable: true, array: true })
  // employerSavedFreelancers?: string[];
  @ManyToMany(
    type => Freelancer,
    freelancer => freelancer.savedByThoseEmployers,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  employerSavedFreelancers: Freelancer[];

  @Column({ nullable: true })
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @OneToOne(
    type => User,
    user => user.userId,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'userUserId' })
  userEmployer: User;
}
