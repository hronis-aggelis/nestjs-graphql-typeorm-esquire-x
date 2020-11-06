import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { FreelancerModule } from './freelancer/freelancer.module';
import { Freelancer } from './freelancer/freelancer.entity';
import * as typeOrmConfig from './config/typeorm.config';
import { CategoryModule } from './category/category.module';
import { EmployerModule } from './employer/employer.module';
import { freelancersEmployerLoader } from './db/loaders/freelancers.loader';
import { userEmployerLoader } from './db/loaders/userInEmployer.loader';
import { JobModule } from './job/job.module';
import { jobEmployerLoader } from './db/loaders/jobInEmployer.loader';
import { JobOfferModule } from './job-offer/job-offer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      typeOrmConfig,
      //   {
      //   type: 'mongodb',
      //   url: 'mongodb://localhost/esquire-x',
      //   synchronize: false,
      //   useUnifiedTopology: true,
      //   entities: [User, Freelancer],
      // }
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      //context: ({ req }) => ({ req }),
      //[
      context: ({ req, connection }) =>
        connection
          ? {
              req: {
                headers: {
                  authorization: connection.context['Authorization']
                    ? connection.context['Authorization']
                    : connection.context['authorization'],
                },
              },
              freelancersEmployerLoader: freelancersEmployerLoader(),
              userEmployerLoader: userEmployerLoader(),
              jobEmployerLoader: jobEmployerLoader(),
            }
          : {
              req,
              freelancersEmployerLoader: freelancersEmployerLoader(),
              userEmployerLoader: userEmployerLoader(),
              jobEmployerLoader: jobEmployerLoader(),
            },
      //() => ({
      //freelancersEmployerLoader: freelancersEmployerLoader()})
      //]
      //{ freelancersEmployerLoader: freelancersEmployerLoader() },
    }),
    UserModule,
    FreelancerModule,
    CategoryModule,
    EmployerModule,
    JobModule,
    JobOfferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
