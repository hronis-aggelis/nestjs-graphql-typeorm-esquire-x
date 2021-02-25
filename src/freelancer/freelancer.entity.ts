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
  OneToMany,
} from 'typeorm';
import { ExperienceLevel } from './enums/freelancer.enum';
import { User } from '../user/user.entity';
import { Employer } from '../employer/employer.entity';
import { JobOffer } from '../job-offer/job-offer.entity';
import { Job } from '../job/job.entity';

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
    user => user.freelancer,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }, //cascade: true,
  )
  @JoinColumn({ name: 'userUserId' })
  user: User;

  // @OneToOne(
  //   type => User,
  //   user => user.freelancer,
  //   { onDelete: 'CASCADE' },
  // )
  // user: User;

  // @Column({ nullable: true })
  // userUserId: string;

  @ManyToMany(
    type => Employer,
    employer => employer.employerSavedFreelancers,
    {
      //cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinTable()
  savedByThoseEmployers: Employer[];

  @OneToMany(
    type => JobOffer,
    jobOffer => jobOffer.freelancerJobOffer,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  jobOfferFreelancer?: JobOffer[];

  @OneToMany(
    type => Job,
    job => job.freelancerJob,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  jobFreelancer?: Job[];
}
