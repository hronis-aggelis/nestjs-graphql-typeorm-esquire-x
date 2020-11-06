import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobOfferRepository } from './job-offer.repository';
import { JobOffer } from './job-offer.entity';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { CreateJobOfferInput } from './dto/job-offer.input';
import { FreelancerService } from '../freelancer/freelancer.service';
import { JobService } from '../job/job.service';
import { Freelancer } from '../freelancer/freelancer.entity';

@Injectable()
export class JobOfferService {
  constructor(
    @InjectRepository(JobOfferRepository)
    private jobOfferRepository: JobOfferRepository,
    @Inject(forwardRef(() => FreelancerService))
    private freelancerService: FreelancerService,
    private jobService: JobService,
  ) {}

  async getJobOffers(): Promise<JobOffer[]> {
    return this.jobOfferRepository.find();
  }

  async createJobOffer(
    data: CreateJobOfferInput,
    user: User,
  ): Promise<JobOffer> {
    const { jobId, freelancerId } = data;
    delete data.jobId;
    delete data.freelancerId;

    const job = await this.jobService.getJobById(jobId);
    if (!(job && job.employerJob.employerId === user.employer.employerId)) {
      throw new NotFoundException('Job not found for current employer!!');
    }
    const freelancer = await this.freelancerService.getFreelancerById(
      freelancerId,
    );

    const jobOffer = {
      ...data,
      jobOfferId: uuid(),
      modifiedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      employerJobOffer: user.employer,
      jobJobOffer: job,
      freelancerJobOffer: freelancer,
    };

    await this.jobOfferRepository.save(jobOffer);

    return jobOffer;
  }

  async deleteJobOffer(jobOfferId: string, user: User): Promise<Boolean> {
    const jobOffer = await this.jobOfferRepository.find({
      jobOfferId,
      employerJobOffer: user.employer,
    });
    if (!jobOffer) {
      throw new InternalServerErrorException('Job does not belong to User!!');
    }

    const result = await this.jobOfferRepository.delete(jobOfferId);

    if (result.affected > 0) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not delete JobOffer!!');
    }
  }

  async getJobOfferByFreelancerId(freelancer: Freelancer): Promise<JobOffer[]> {
    return this.jobOfferRepository.find({ freelancerJobOffer: freelancer });
  }
}
