import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from '../../user/models/user.model';
import { User } from '../../user/user.entity';
import { FreelancerType } from '../../freelancer/models/freelancer.model';
import { Freelancer } from 'src/freelancer/freelancer.entity';

@ObjectType('Employer')
export class EmployerType {
  @Field(type => ID)
  employerId: string;

  @Field(type => UserType)
  userEmployer: User;

  @Field(type => [FreelancerType], { nullable: true })
  employerSavedFreelancers: Freelancer[];

  slug?: string;
  modifiedDate: string;
  createdDate: string;
}
