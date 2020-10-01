import { freelancersEmployerLoader } from '../db/loaders/freelancers.loader';
import { userEmployerLoader } from '../db/loaders/userInEmployer.loader';

export interface IGraphQLContext {
  freelancersEmployerLoader: ReturnType<typeof freelancersEmployerLoader>;
  userEmployerLoader: ReturnType<typeof userEmployerLoader>;
}
