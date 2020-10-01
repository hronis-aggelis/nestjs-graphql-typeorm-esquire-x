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

@Module({
  imports: [
    FreelancerModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([EmployerRepository]),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [EmployerResolver, EmployerService], //, JwtStrategy],
  exports: [EmployerService],
})
export class EmployerModule {}
