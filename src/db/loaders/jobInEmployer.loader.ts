import DataLoader = require('dataloader');
//import Book from '../models/book.entity';
import { getRepository } from 'typeorm';
//import BookGenre from '../models/book-genre.entity';
import FreelancerEmployer from '../models/freelancersEmployers.entity';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { Employer } from '../../employer/employer.entity';
import { User } from '../../user/user.entity';
import { Job } from '../../job/job.entity';

const batchJobs = async (employerIds: string[]) => {
  // const employerTable = getRepository(Employer);
  // const employers = await employerTable.findByIds(employerIds, {
  //   relations: ['jobEmployer'],
  // });
  //const users = employers.map(employer => employer.userEmployer)

  const jobs = await getRepository(Job)
    .createQueryBuilder('jobs')
    .leftJoinAndSelect('jobs.employerJob', 'employerJob')
    .where('employerJob.employerId IN(:...ids)', {
      ids: employerIds,
    })
    .getMany();

  const employerIdToJob: { [key: string]: any } = {};

  jobs.forEach(job => {
    if (!employerIdToJob[job.employerJob.employerId]) {
      employerIdToJob[job.employerJob.employerId] = [job];
    } else {
      employerIdToJob[job.employerJob.employerId].push(job);
    }
  });
  //console.log(employerIds.map(employerId => employerIdToJob[employerId]));
  return employerIds.map(employerId => employerIdToJob[employerId]);
};

const jobEmployerLoader = () => new DataLoader(batchJobs);

export { jobEmployerLoader };
