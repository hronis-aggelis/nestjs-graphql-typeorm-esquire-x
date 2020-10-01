import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRepository } from './job.repository';
import { CreateJobInput } from './dto/job.input';
import { User } from '../user/user.entity';
import { Job } from './job.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JobService {
  constructor(@InjectRepository(JobRepository) jobRepository: JobRepository) {}

  async createJob(data: CreateJobInput, user: User): Promise<Job> {
    if (!user.isEmployer) {
      throw new InternalServerErrorException('User is not an Employer!!');
    }

    const job = {
      ...data,
      jobId: uuid(),
      modifiedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      userJob: user,
    };

    return job;
  }
}
