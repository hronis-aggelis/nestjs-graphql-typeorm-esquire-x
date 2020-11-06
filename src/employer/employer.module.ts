import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerResolver } from './employer.resolver';
import { EmployerService } from './employer.service';
import { Employer } from './employer.entity';
import { EmployerRepository } from './employer.repository';
import { FreelancerModule } from '../freelancer/freelancer.module';
//import { JwtStrategy } from './new_jwt_strategy/jwt.strategy';
import { UserRepository } from '../user/user.repository';
import { JobRepository } from '../job/job.repository';
import { JobModule } from '../job/job.module';
//import { JwtStrategy } from '../user/auth-jwt-utils/jwt.strategy';

@Module({
  imports: [
    FreelancerModule,
    forwardRef(() => UserModule),
    JobModule,
    TypeOrmModule.forFeature([EmployerRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([JobRepository]),
  ],
  providers: [EmployerResolver, EmployerService], //, JwtStrategy],
  exports: [EmployerService],
})
export class EmployerModule {}
