import DataLoader = require('dataloader');
//import Book from '../models/book.entity';
import { getRepository } from 'typeorm';
//import BookGenre from '../models/book-genre.entity';
import FreelancerEmployer from '../models/freelancersEmployers.entity';
import { Freelancer } from '../../freelancer/freelancer.entity';
import { Employer } from '../../employer/employer.entity';

const batchFreelancers = async (employerIds: string[]) => {
  const freelancersEmployers = getRepository(FreelancerEmployer);

  const result = await getRepository(FreelancerEmployer)
    .createQueryBuilder('freelancers_saved_by_those_employers_employers')
    .leftJoinAndSelect(
      'freelancers_saved_by_those_employers_employers.freelancer',
      'freelancersFreelancerId',
    )
    .where(
      'freelancers_saved_by_those_employers_employers.employersEmployerId IN(:...ids)',
      { ids: employerIds },
    )
    .getMany();

  const employerIdToFreelancers: { [key: string]: any } = {};

  result.forEach(freelancerEmployer => {
    if (!employerIdToFreelancers[freelancerEmployer.employersEmployerId]) {
      employerIdToFreelancers[freelancerEmployer.employersEmployerId] = [
        freelancerEmployer.freelancer,
      ];
    } else {
      employerIdToFreelancers[freelancerEmployer.employersEmployerId].push(
        freelancerEmployer.freelancer,
      );
    }
  });
  return employerIds.map(employerId => employerIdToFreelancers[employerId]);
};

//   const bookGenres = await getRepository(BookGenre)
//     .createQueryBuilder('bookGenres')
//     .leftJoinAndSelect('bookGenres.book', 'book')
//     .where('bookGenres.id IN(:...ids)', {ids: genreIds})
//     .getMany();
//   const genreIdToBooks: {[key: string]: Book[]} = {};
//   bookGenres.forEach(bookGenre => {
//     if (!genreIdToBooks[bookGenre.genreId]) {
//       genreIdToBooks[bookGenre.genreId] = [(bookGenre as any).__book__];
//     } else {
//       genreIdToBooks[bookGenre.genreId].push((bookGenre as any).__book__);
//     }
//   });
//   return genreIds.map(genreId => genreIdToBooks[genreId]);
// };
const freelancersEmployerLoader = () => new DataLoader(batchFreelancers);

export { freelancersEmployerLoader };
