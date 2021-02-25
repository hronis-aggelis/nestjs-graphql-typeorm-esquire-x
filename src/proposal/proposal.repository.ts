import { EntityRepository, Repository } from 'typeorm';
import { Proposal } from './proposal.entity';

@EntityRepository(Proposal)
export class ProposalRepository extends Repository<Proposal> {}
