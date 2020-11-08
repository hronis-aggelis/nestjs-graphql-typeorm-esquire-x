import { freelancersEmployerLoader } from '../db/loaders/freelancers.loader';
import { userEmployerLoader } from '../db/loaders/userInEmployer.loader';
import { jobEmployerLoader } from '../db/loaders/jobInEmployer.loader';
import { userFreelancerLoader } from '../db/loaders/userInFreelancer.loader';

export interface IGraphQLContext {
  freelancersEmployerLoader: ReturnType<typeof freelancersEmployerLoader>;
  userEmployerLoader: ReturnType<typeof userEmployerLoader>;
  jobEmployerLoader: ReturnType<typeof jobEmployerLoader>;
  userFreelancerLoader: ReturnType<typeof userFreelancerLoader>;
}
