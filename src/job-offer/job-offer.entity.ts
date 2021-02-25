import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Employer } from '../employer/employer.entity';
import { Job } from '../job/job.entity';
import { Freelancer } from '../freelancer/freelancer.entity';

@Entity('jobOffers')
export class JobOffer {
  @PrimaryColumn()
  jobOfferId: string;

  @Column()
  accepted: boolean;

  @Column()
  alertNewJobOffer: boolean;

  @Column()
  completed: boolean;

  @Column()
  proposedPrice: number;

  @Column()
  employerJobOfferSend: boolean;

  @Column()
  coverLetter: string;

  @Column()
  freelancerSubmittedProposal: boolean;

  @Column()
  projectRejected: boolean;

  @Column()
  title: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  modifiedDate: string;

  @Column()
  createdDate: string;

  @ManyToOne(
    type => Job,
    job => job.jobOfferJob,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  jobJobOffer: Job;

  @ManyToOne(
    type => Employer,
    employer => employer.jobOfferEmployer,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
  employerJobOffer: Employer;

  @ManyToOne(
    type => Freelancer,
    freelancer => freelancer.jobOfferFreelancer,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
  freelancerJobOffer: Freelancer;
}
