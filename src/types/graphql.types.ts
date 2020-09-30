import { freelancersEmployerLoader } from '../db/loaders/freelancers.loader';

export interface IGraphQLContext {
  freelancersEmployerLoader: ReturnType<typeof freelancersEmployerLoader>;
}
