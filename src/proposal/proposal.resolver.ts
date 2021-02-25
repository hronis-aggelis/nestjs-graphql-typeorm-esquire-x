import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ProposalType } from './models/proposal.model';
import { ProposalService } from './proposal.service';
import { CreateProposalInput } from './dto/proposal.dto';
import { UseGuards, InternalServerErrorException } from '@nestjs/common';
import { GqlAuthGuard } from '../user/auth-jwt-utils/auth.guard';
import { User } from '../user/user.entity';
import { CurrentUser } from '../user/custom-decorators/user.decorator';
import { Proposal } from './proposal.entity';

@Resolver(() => ProposalType)
export class ProposalResolver {
  constructor(private proposalService: ProposalService) {}

  @Mutation(returns => ProposalType)
  @UseGuards(GqlAuthGuard)
  async createProposal(
    @CurrentUser() user: User,
    @Args('data') data: CreateProposalInput,
  ): Promise<Proposal> {
    if (user.freelancer) {
      return this.proposalService.createProposal(user, data);
    }
  
    throw new InternalServerErrorException('User is not a freelancer!!');
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async acceptProposal(
    @CurrentUser() user: User,
    @Args('proposalId') proposalId: string,
  ): Promise<Boolean> {
    if (user.employer) {
      return this.proposalService.updateProposalAfterAcceptanceAndCreateChat(
        user,
        proposalId,
      );
    }

    throw new InternalServerErrorException(' User is not an employer!!');
  }
}
