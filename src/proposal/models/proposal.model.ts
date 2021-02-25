import { ObjectType, ID, Field, Float } from '@nestjs/graphql';
import { User } from '../../user/user.entity';
import { UserType } from '../../user/models/user.model';
import { ChatType } from '../../chat/models/chat.model';
import { Chat } from '../../chat/chat.entity';
import { EmployerType } from '../../employer/models/employer.model';
import { FreelancerType } from '../../freelancer/models/freelancer.model';
import { Employer } from '../../employer/employer.entity';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { JobType } from '../../job/models/job.model';
import { Job } from '../../job/job.entity';

@ObjectType('Proposal')
export class ProposalType {
  @Field(type => ID)
  proposalId: string;

  @Field(type => EmployerType)
  employerProposal: Employer;

  @Field(type => FreelancerType)
  freelancerProposal: Freelancer;

  @Field(type => JobType)
  jobProposal: Job;

  coverLetter?: string;
  result?: string;
  slug?: string;
  modifiedDate: string;
  createdDate: string;
}
