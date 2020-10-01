import { Module } from '@nestjs/common';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from './job.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository])],
  providers: [JobResolver, JobService],
  exports: [JobService],
})
export class JobModule {}
