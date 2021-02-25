import { Module } from '@nestjs/common';
import { ProposalResolver } from './proposal.resolver';
import { ProposalService } from './proposal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalRepository } from './proposal.repository';
import { JobRepository } from '../job/job.repository';
import { ChatService } from '../chat/chat.service';
import { FreelancerRepository } from '../freelancer/freelancer.repository';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([ProposalRepository]),
    TypeOrmModule.forFeature([JobRepository]),
    TypeOrmModule.forFeature([FreelancerRepository]),
    //ChatService,
    ChatModule
  ],
  providers: [ProposalResolver, ProposalService],
})
export class ProposalModule {}
