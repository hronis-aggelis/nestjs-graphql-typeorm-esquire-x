import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from './freelancer.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { PartialType } from '@nestjs/graphql';
import { CreateFreelancerInput } from './dto/freelancer.input';
import { UpdateFreelancerInput } from './dto/freelancer-update.input';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { FreelancerRepository } from './freelancer.repository';
import { Employer } from '../employer/employer.entity';
import { Job } from '../job/job.entity';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(FreelancerRepository)
    private freelancerRepository: FreelancerRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private categoryService: CategoryService,
  ) {}

  async getFreelancerById(id: string): Promise<Freelancer> {
    const freelancer = await this.freelancerRepository.findOne(id, {
      relations: ['jobFreelancer'],
    });
    if (!freelancer) {
      throw new NotFoundException('Freelancer not found!!');
    }

    return freelancer;
  }

  async getFreelancers(): Promise<Freelancer[]> {
    return this.freelancerRepository.find();
  }

  async createFreelancer(
    data: CreateFreelancerInput,
    user: User,
  ): Promise<Freelancer> {
    const freelancer = {
      ...data,
      freelancerId: await uuid(),
      modifiedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      user,
      //userUserId: user.userId,
    };
    const result = this.freelancerRepository.create(freelancer);

    await this.freelancerRepository.save(result);

    return result;
  }

  async updateFreelancer(
    data: UpdateFreelancerInput,
    user: User,
  ): Promise<Boolean> {
    const result = await this.freelancerRepository.update(
      { user },
      {
        ...data,
        modifiedDate: new Date().toISOString(),
      },
    );

    if (result.affected > 0) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not update User!!');
    }
  }

  async deleteFreelancer(user: User): Promise<Boolean> {
    const result = await this.freelancerRepository.delete({ user });
    if (result.affected > 0) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not delete Freelancer!!');
    }
  }

  async user(freelancer: Freelancer): Promise<User> {
    return this.userService.user(freelancer);
  }

  async freelancer(user: User): Promise<Freelancer> {
    return this.freelancerRepository.findOne({
      user,
    });
  }

  async categories(freelancer: Freelancer): Promise<Category[]> {
    return this.categoryService.findCategoriesByIds(freelancer);
  }

  async getManyFreelancers(freelancersId: string[]): Promise<Freelancer[]> {
    if (freelancersId) {
      return this.freelancerRepository.findByIds(freelancersId);
    }
  }

  // async assignEmployerToFreelancers(
  //   freelancersId: string[],
  //   employer: Employer,
  // ): Promise<Boolean> {
  //   const freelancers = await this.freelancerRepository.findByIds(
  //     freelancersId,
  //   );

  //   freelancers.map(freelancer =>
  //     Array.isArray(freelancer.savedByThoseEmployers) &&
  //     freelancer.savedByThoseEmployers.length
  //       ? (freelancer.savedByThoseEmployers = [
  //           ...freelancer.savedByThoseEmployers,
  //           employer,
  //         ])
  //       : (freelancer.savedByThoseEmployers = [employer]),
  //   );

  //   await freelancers.map(freelancer =>
  //     this.freelancerRepository.save(freelancer),
  //   );

  //   return true;
  // }

  async savedByThoseEmployers(freelancer: Freelancer): Promise<Employer[]> {
    const freelancerWithEmployers = await this.freelancerRepository.findOne(
      freelancer.freelancerId,
      { relations: ['savedByThoseEmployers'] },
    );
    return freelancerWithEmployers.savedByThoseEmployers;
  }

  async jobFreelancer(freelancer: Freelancer): Promise<Job[]> {
    //return this.jobService.getJobByFreelancerId(freelancer);
    const fullFreelancer = await this.freelancerRepository.findOne(
      freelancer.freelancerId,
      { relations: ['jobFreelancer'] },
    );

    return fullFreelancer.jobFreelancer;
  }
}
