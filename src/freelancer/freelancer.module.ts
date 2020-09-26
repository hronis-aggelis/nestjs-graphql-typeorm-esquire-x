import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Freelancer } from './freelancer.entity';
import { FreelancerResolver } from './freelancer.resolver';
import { FreelancerService } from './freelancer.service';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { CategoryModule } from '../category/category.module';
import { FreelancerRepository } from './freelancer.repository';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([FreelancerRepository]),
    CategoryModule,
  ],
  providers: [FreelancerResolver, FreelancerService],
  exports: [FreelancerService],
})
export class FreelancerModule {}
