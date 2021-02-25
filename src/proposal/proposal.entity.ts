import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Job } from '../job/job.entity';
import { Employer } from '../employer/employer.entity';
import { Freelancer } from '../freelancer/freelancer.entity';

@Entity('Proposals')
export class Proposal {
  @PrimaryColumn()
  proposalId: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @Column({ nullable: true })
  result?: string; //enum

  @Column({ nullable: true })
  coverLetter?: string;

  @ManyToOne(
    type => Employer,
    employer => employer.employerId,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'employerId' })
  employerProposal: Employer;

  @ManyToOne(
    type => Freelancer,
    freelancer => freelancer.freelancerId,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'freelancerId' })
  freelancerProposal: Freelancer;

  @ManyToOne(
    type => Job,
    job => job.jobId,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'jobId' })
  jobProposal: Job;
}
