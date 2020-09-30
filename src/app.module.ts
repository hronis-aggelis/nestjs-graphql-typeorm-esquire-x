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
      //context: ({ req }) => ({ req }),
      //[
      context: ({ req }) => ({
        req,
        freelancersEmployerLoader: freelancersEmployerLoader(),
      }),
      //() => ({
      //freelancersEmployerLoader: freelancersEmployerLoader()})
      //]
      //{ freelancersEmployerLoader: freelancersEmployerLoader() },
    }),
    UserModule,
    FreelancerModule,
    CategoryModule,
    EmployerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
