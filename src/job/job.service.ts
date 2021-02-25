import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRepository } from './job.repository';
import { CreateJobInput } from './dto/job.input';
import { User } from '../user/user.entity';
import { Job } from './job.entity';
import { v4 as uuid } from 'uuid';
import { UpdateJobInput } from './dto/job-update.input';
import { Employer } from '../employer/employer.entity';
import { Freelancer } from '../freelancer/freelancer.entity';
import { JobOffer } from '../job-offer/job-offer.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository) private jobRepository: JobRepository,
  ) {}

  async getJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async getJobById(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne(id, {
      relations: ['employerJob'],
    });
    if (!job) {
      throw new NotFoundException('Job not found!!');
    }

    return job;
  }

  async createJob(data: CreateJobInput, user: User): Promise<Job> {
    // if (!user.isEmployer) {
    //   throw new InternalServerErrorException('User is not an Employer!!');
    // }
    if (!user.employer) {
      throw new InternalServerErrorException('User is not an Employer!!');
    }

    const job = {
      ...data,
      jobId: uuid(),
      modifiedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      employerJob: user.employer,
      jobOfferJob: [],
    };

    await this.jobRepository.save(job);

    return job;
  }

  async updateJob(
    data: UpdateJobInput,
    jobId: string,
    user: User,
  ): Promise<Boolean> {
    const job = await this.jobRepository.find({
      jobId,
      employerJob: user.employer,
    });
    if (!job) {
      throw new InternalServerErrorException('Job does not belong to User!!');
    }
    const result = await this.jobRepository.update(jobId, {
      ...data,
      modifiedDate: new Date().toISOString(),
    });

    if (result.affected > 0) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not update Job!!');
    }
  }

  async deleteJob(user: User, jobId: string): Promise<Boolean> {
    const job = await this.jobRepository.find({
      jobId,
      employerJob: user.employer,
    });
    if (!job) {
      throw new InternalServerErrorException('Job does not belong to User!!');
    }

    const result = await this.jobRepository.delete(jobId);

    if (result.affected > 0) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not delete Job!!');
    }
  }

  async freelancerJob(job: Job): Promise<Freelancer> {
    const fullJob = await this.jobRepository.findOne(job.jobId, {
      relations: ['freelancerJob'],
    });

    return fullJob.freelancerJob;
  }

  async jobOfferJob(job: Job): Promise<JobOffer[]> {
    const fullJob = await this.jobRepository.findOne(job.jobId, {
      relations: ['jobOfferJob'],
    });

    return fullJob.jobOfferJob;
  }

  // async getJobByFreelancerId(freelancer: Freelancer): Promise<Job[]> {
  //   return this.jobRepository.find(
  //     { freelancerJob: freelancer },
  //     { relations: ['freelancerJob'] },
  //   );
  // }
}
