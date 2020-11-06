import { Module, forwardRef } from '@nestjs/common';
import { JobOfferResolver } from './job-offer.resolver';
import { JobOfferService } from './job-offer.service';
import { JobOfferRepository } from './job-offer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { JobModule } from '../job/job.module';

@Module({
  imports: [
    forwardRef(() => FreelancerModule),
    JobModule,
    TypeOrmModule.forFeature([JobOfferRepository]),
  ],
  providers: [JobOfferResolver, JobOfferService],
  exports: [JobOfferService],
})
export class JobOfferModule {}
