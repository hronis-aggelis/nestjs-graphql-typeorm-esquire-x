import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerResolver } from './employer.resolver';
import { EmployerService } from './employer.service';
import { Employer } from './employer.entity';
import { EmployerRepository } from './employer.repository';
import { FreelancerModule } from '../freelancer/freelancer.module';

@Module({
  imports: [
    FreelancerModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([EmployerRepository]),
  ],
  providers: [EmployerResolver, EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}
