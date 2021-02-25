import { Module } from '@nestjs/common';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from './job.repository';
//import { JwtStrategy } from './employerJwtStrategy/jwt.strategy';
import { UserRepository } from '../user/user.repository';
import { EmployerRepository } from '../employer/employer.repository';
import { FreelancerRepository } from '../freelancer/freelancer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([EmployerRepository]),
    TypeOrmModule.forFeature([FreelancerRepository]),
  ],
  providers: [JobResolver, JobService], //, JwtStrategy],
  exports: [JobService],
})
export class JobModule {}
