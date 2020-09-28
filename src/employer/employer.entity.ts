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
    freelancer => freelancer.SavedByThoseEmployers,
    {
      //cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  employerSavedFreelancers: string[];

  @Column({ nullable: true })
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @OneToOne(
    type => User,
    user => user.userId,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'userUserId' })
  userEmployer: User;

  // @Column()
  // userEmployerUserId: string;

  // @ManyToMany(
  //   type => Freelancer,
  //   employer => employer.employerSavedFreelancers,
  //   {
  //     cascade: true,
  //   },
  // )
  // @JoinTable()
  // SavedByThoseEmployers: Employer[];
}
