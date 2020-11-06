import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Employer } from '../employer/employer.entity';
import { JobOffer } from '../job-offer/job-offer.entity';

@Entity('jobs')
export class Job {
  @PrimaryColumn()
  jobId: string;

  @Column()
  freelancerRated: boolean;

  @Column()
  jobCompleted: boolean;

  @Column()
  jobActive: boolean;

  @Column()
  jobAmount: number;

  @Column()
  jobBudget: number;

  @Column()
  jobClosed: boolean;

  @Column()
  jobDescription: string;

  @Column()
  jobExperienceLevel: string; //enum

  @Column({ nullable: true })
  jobFreelancerCoverLetter?: string;

  @Column({ nullable: true })
  jobHoursPerWeek?: number; //enum

  @Column()
  jobNew: boolean;

  @Column()
  jobRated: boolean;

  @Column()
  jobStartDate: string; //date

  @Column()
  jobTitle: string;

  @Column()
  jobType: string; //enum

  @Column()
  jobProjectLength: string; //enum

  @Column({ nullable: true })
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @ManyToOne(
    type => Employer,
    employer => employer.jobEmployer,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
  employerJob: Employer;

  @OneToMany(
    type => JobOffer,
    jobOffer => jobOffer.jobJobOffer,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  jobOfferJob: JobOffer[];
}
