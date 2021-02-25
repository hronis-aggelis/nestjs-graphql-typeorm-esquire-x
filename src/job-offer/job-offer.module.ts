import { Module, forwardRef } from '@nestjs/common';
import { JobOfferResolver } from './job-offer.resolver';
import { JobOfferService } from './job-offer.service';
import { JobOfferRepository } from './job-offer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { JobModule } from '../job/job.module';
import { JobRepository } from '../job/job.repository';
import { FreelancerRepository } from '../freelancer/freelancer.repository';

@Module({
  imports: [
    forwardRef(() => FreelancerModule),
    JobModule,
    TypeOrmModule.forFeature([JobOfferRepository]),
    TypeOrmModule.forFeature([JobRepository]),
    TypeOrmModule.forFeature([FreelancerRepository]),
  ],
  providers: [JobOfferResolver, JobOfferService],
  exports: [JobOfferService],
})
export class JobOfferModule {}
