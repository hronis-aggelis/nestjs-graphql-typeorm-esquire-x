import DataLoader = require('dataloader');
//import Book from '../models/book.entity';
import { getRepository } from 'typeorm';
//import BookGenre from '../models/book-genre.entity';
import FreelancerEmployer from '../models/freelancersEmployers.entity';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { Employer } from '../../employer/employer.entity';
import { User } from '../../user/user.entity';

const batchUsers = async (freelancerIds: string[]) => {
  const freelancerTable = getRepository(Freelancer);
  const freelancers = await freelancerTable.findByIds(freelancerIds, {
    relations: ['user'],
  });
  //const users = employers.map(employer => employer.userEmployer)

  const freelancerIdToUser: { [key: string]: any } = {};

  freelancers.forEach(
    freelancer =>
      (freelancerIdToUser[freelancer.freelancerId] = freelancer.user),
  );
  return freelancerIds.map(freelancerId => freelancerIdToUser[freelancerId]);
};

const userFreelancerLoader = () => new DataLoader(batchUsers);

export { userFreelancerLoader };
