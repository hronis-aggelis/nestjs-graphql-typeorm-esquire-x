import { Unique, MaxKey } from 'typeorm';
import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';
import { ExperienceLevel } from '../enums/freelancer.enum';
import { CategoryType } from 'src/category/models/category.model';
import { Category } from 'src/category/category.entity';

@InputType()
export class CreateFreelancerInput {
  @Field(type => Float)
  freelancerHourlyRate: number;

  @Field()
  freelancerAvailability: string; //enum

  @Field()
  freelancerExperienceLevel: ExperienceLevel; //enum

  @Field(() => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  categories?: string[];

  @Field(type => [String])
  freelancerSkills: string[]; //enum

  @Field()
  slug: string;
}
