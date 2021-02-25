import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalRepository } from './proposal.repository';
import { User } from '../user/user.entity';
import { CreateProposalInput } from './dto/proposal.dto';
import { Proposal } from './proposal.entity';
import { JobRepository } from '../job/job.repository';
import { v4 as uuid } from 'uuid';
import { ChatService } from '../chat/chat.service';
import { FreelancerRepository } from '../freelancer/freelancer.repository';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(ProposalRepository)
    private proposalRepository: ProposalRepository,
    @InjectRepository(JobRepository) private jobRepository: JobRepository,
    @InjectRepository(FreelancerRepository) private freelancerRepository: FreelancerRepository,
    private chatService: ChatService,
  ) {}

  async createProposal(
    user: User,
    data: CreateProposalInput,
  ): Promise<Proposal> {
    const { jobId, slug } = data;
    const job = await this.jobRepository.findOne(jobId, {
      relations: ['employerJob'],
    });

    const proposal: Proposal = {
      proposalId: uuid(),
      employerProposal: job.employerJob,
      freelancerProposal: user.freelancer,
      jobProposal: job,
      modifiedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      slug,
    };

    return this.proposalRepository.save(proposal);
  }

  async updateProposalAfterAcceptanceAndCreateChat(
    user: User,
    proposalId: string,
  ): Promise<Boolean> {
    const fullProposal = await this.proposalRepository.findOne(proposalId, {relations: ['freelancerProposal']})
    const fullFreelancer = await this.freelancerRepository.findOne(fullProposal.freelancerProposal.freelancerId, { relations: ['user']})
    await this.chatService.createChat(user, fullFreelancer.user)
    
    const result = await this.proposalRepository.update(
      { proposalId: fullProposal.proposalId },
      {
        result: 'accepted',
        modifiedDate: new Date().toISOString(),
      },
    );

    if (result.affected > 0) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not update Proposal!!');
    }
  }
}
