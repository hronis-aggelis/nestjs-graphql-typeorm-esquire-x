import { ObjectType, Field, ID } from '@nestjs/graphql';
import { FreelancerType } from '../../freelancer/models/freelancer.model';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { EmployerType } from '../../employer/models/employer.model';
import { Employer } from '../../employer/employer.entity';

@ObjectType('User')
export class UserType {
  @Field(type => ID)
  userId: string;

  @Field(type => FreelancerType, { nullable: true })
  freelancer: Freelancer;

  @Field(type => EmployerType, { nullable: true })
  employer: Employer;

  default_card_ID: string;
  emailTemp?: string;
  firstName: string;
  lastName: string;
  isEmployer: boolean;
  notification: boolean;
  StripeCostumerID?: string;
  userAdmin: boolean;
  email: string;
  slug: string;
  modifiedDate: string;
  createdDate: string;
  password: string;
}
