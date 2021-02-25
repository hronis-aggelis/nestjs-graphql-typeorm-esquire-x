import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobOfferRepository } from './job-offer.repository';
import { JobRepository } from '../job/job.repository';
import { JobOffer } from './job-offer.entity';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { CreateJobOfferInput } from './dto/job-offer.input';
import { FreelancerService } from '../freelancer/freelancer.service';
import { JobService } from '../job/job.service';
import { Freelancer } from '../freelancer/freelancer.entity';
import { UpdateJobOfferInput } from './dto/job-offer-update.input';
import { FreelancerRepository } from '../freelancer/freelancer.repository';
import { Job } from '../job/job.entity';

@Injectable()
export class JobOfferService {
  constructor(
    @InjectRepository(JobOfferRepository)
    private jobOfferRepository: JobOfferRepository,
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
    @InjectRepository(FreelancerRepository)
    private freelancerRepository: FreelancerRepository,
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

  async updateJobOffer(
    jobOfferId: string,
    data: UpdateJobOfferInput,
    user: User,
  ): Promise<Boolean> {
    const jobOffer = await this.jobOfferRepository.find({
      where: [
        {
          jobOfferId,
          employerJobOffer: user.employer,
        },
        { jobOfferId, freelancerJobOffer: user.freelancer },
      ],
    });
    if (!jobOffer) {
      throw new InternalServerErrorException(
        'JobOffer does not belong to User!!',
      );
    }

    const result = await this.jobOfferRepository.update(
      { jobOfferId: jobOfferId },
      {
        ...data,
        modifiedDate: new Date().toISOString(),
      },
    );

    if (result.affected > 0) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not update User!!');
    }
  }

  async deleteJobOffer(jobOfferId: string, user: User): Promise<Boolean> {
    const jobOffer = await this.jobOfferRepository.find({
      jobOfferId,
      employerJobOffer: user.employer,
    });
    if (!jobOffer) {
      throw new InternalServerErrorException(
        'JobOffer does not belong to User!!',
      );
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

  async updateJobAndFreelancerFieldsAfterAcceptance(
    jobOfferId: string,
    user: User,
  ) {
    const jobOffer = await this.jobOfferRepository.findOne(jobOfferId, {
      relations: ['jobJobOffer', 'freelancerJobOffer'],
    });
    const freelancer = await this.freelancerRepository.findOne(
      user.freelancer.freelancerId,
      { relations: ['jobOfferFreelancer', 'jobFreelancer'] },
    );

    const count = freelancer.jobOfferFreelancer.filter(
      x => x.jobOfferId === jobOffer.jobOfferId,
    ).length;
    if (count === 0) {
      throw new InternalServerErrorException(
        'Job Offer does not belong to Freelancer!!',
      );
    }

    await this.jobRepository.update(
      { jobId: jobOffer.jobJobOffer.jobId },
      {
        jobActive: true,
        freelancerJob: freelancer,
        jobStartDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
      },
    );

    // await this.freelancerRepository.update(
    //   { freelancerId: freelancer.freelancerId },
    //   {
    //     jobFreelancer:
    //       freelancer.jobFreelancer.length < 1
    //         ? this.addJob(freelancer, jobOffer)
    //         : [jobOffer.jobJobOffer],
    //   },
    // );
  }

  // addJob = (freelancer: Freelancer, jobOffer: JobOffer): Job[] => {
  //   freelancer.jobFreelancer.push(jobOffer.jobJobOffer);
  //   return freelancer.jobFreelancer;
  // };
}
