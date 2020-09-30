import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { Employer } from '../../employer/employer.entity';

@Entity('freelancers_saved_by_those_employers_employers')
export default class FreelancerEmployer {
  [x: string]: Freelancer;
  // @PrimaryGeneratedColumn()
  // id: number;

  //change it to any
  @PrimaryColumn() //{ name: 'freelancerId' })
  freelancersFreelancerId: any;

  @PrimaryColumn() //{ name: 'employerId' })
  employersEmployerId: any;

  // Associations
  @ManyToOne(
    () => Freelancer,
    freelancer => freelancer.savedByThoseEmployers,
    { primary: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'freelancersFreelancerId' })
  freelancer: any;

  @ManyToOne(
    () => Employer,
    employer => employer.employerSavedFreelancers,
    { primary: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'employersEmployerId' })
  employer: any;
}
