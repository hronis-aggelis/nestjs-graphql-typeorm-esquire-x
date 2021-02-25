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
import { JobOfferType } from '../../job-offer/models/job-offer.model';
import { JobOffer } from '../../job-offer/job-offer.entity';
import { JobType } from '../../job/models/job.model';
import { Job } from '../../job/job.entity';

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

  @Field(type => [JobOfferType], { nullable: true })
  jobOfferFreelancer: JobOffer[];

  @Field(type => [JobType], { nullable: 'itemsAndList' })
  jobFreelancer: Job[];

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
