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
import { Job } from '../job/job.entity';
import { JobOffer } from '../job-offer/job-offer.entity';

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
    user => user.employer,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }, //cascade: true,},
  )
  @JoinColumn({ name: 'userUserId' })
  userEmployer: User;

  @OneToMany(
    type => Job,
    job => job.employerJob,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  jobEmployer: Job[];

  @OneToMany(
    type => JobOffer,
    jobOffer => jobOffer.employerJobOffer,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  jobOfferEmployer: JobOffer[];
}
