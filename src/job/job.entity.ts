import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

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

  @Column()
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @ManyToOne(
    type => User,
    user => user.userId,
  )
  @JoinColumn()
  userJob: User;
}
