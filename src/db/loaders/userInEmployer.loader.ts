import DataLoader = require('dataloader');
//import Book from '../models/book.entity';
import { getRepository } from 'typeorm';
//import BookGenre from '../models/book-genre.entity';
import FreelancerEmployer from '../models/freelancersEmployers.entity';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { Employer } from '../../employer/employer.entity';
import { User } from '../../user/user.entity';

const batchUsers = async (employerIds: string[]) => {
  const employerTable = getRepository(Employer);
  const employers = await employerTable.findByIds(employerIds, {
    relations: ['userEmployer'],
  });
  //const users = employers.map(employer => employer.userEmployer)

  const employerIdToUser: { [key: string]: any } = {};

  employers.forEach(
    employer => (employerIdToUser[employer.employerId] = employer.userEmployer),
  );
  return employerIds.map(employerId => employerIdToUser[employerId]);
};

const userEmployerLoader = () => new DataLoader(batchUsers);

export { userEmployerLoader };
