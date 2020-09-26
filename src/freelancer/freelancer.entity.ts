import {
  Entity,
  PrimaryColumn,
  Column,
  ObjectIdColumn,
  ObjectID,
  Unique,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ExperienceLevel } from './enums/freelancer.enum';
import { User } from '../user/user.entity';
import { Employer } from '../employer/employer.entity';

@Entity('freelancers')
export class Freelancer {
  @PrimaryColumn()
  freelancerId: string;

  @Column()
  freelancerAvailability: string;

  @Column()
  freelancerExperienceLevel: ExperienceLevel;

  @Column('text', { array: true })
  categories: string[];

  @Column('text', { array: true })
  freelancerSkills: string[];

  @Column()
  freelancerHourlyRate: number;

  @Column()
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  // @OneToOne(
  //   type => User,
  //   user => user.freelancer.freelancerId,
  //   {
  //     onDelete: 'CASCADE',
  //   },
  // )
  //@Column()
  // @OneToOne(type => User)
  // user: User;

  @OneToOne(
    type => User,
    user => user.userId,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user: User;

  // @OneToOne(
  //   type => User,
  //   user => user.freelancer,
  //   { onDelete: 'CASCADE' },
  // )
  // user: User;

  @Column({ nullable: true })
  userUserId: string;

  @ManyToMany(
    type => Employer,
    employer => employer.employerSavedFreelancers,
    {
      cascade: true,
    },
  )
  @JoinTable()
  SavedByThoseEmployers: Employer[];
}
