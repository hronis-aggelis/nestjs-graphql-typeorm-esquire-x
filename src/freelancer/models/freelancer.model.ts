import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { UserType } from '../../user/models/user.model';
import { User } from '../../user/user.entity';
import { ExperienceLevel, Availability } from '../enums/freelancer.enum';
import { Category } from '../../category/category.entity';
import { CategoryType } from '../../category/models/category.model';
import { Employer } from '../../employer/employer.entity';
import { EmployerType } from '../../employer/models/employer.model';

@ObjectType('Freelancer')
export class FreelancerType {
  @Field(type => ID)
  freelancerId: string;

  @Field(type => Float)
  freelancerHourlyRate: number;

  @Field(type => UserType)
  user: User;

  @Field(type => [CategoryType])
  categories?: string[];

  @Field(type => [EmployerType], { nullable: 'itemsAndList' })
  savedByThoseEmployers: Employer[];

  freelancerAvailability: Availability; //enum
  freelancerExperienceLevel: ExperienceLevel;
  freelancerSkills: string[]; //enum
  slug: string;
  modifiedDate: string;
  createdDate: string;
}

registerEnumType(ExperienceLevel, {
  name: 'ExperienceLevel',
});

registerEnumType(Availability, {
  name: 'Availability',
});
