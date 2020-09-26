import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { PartialType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { Employer } from './employer.entity';
import { EmployerRepository } from './employer.repository';
import { Freelancer } from '../freelancer/freelancer.entity';
import { CreateEmployerInput } from './dto/employer.input';
import { AssignEmployerSavedFreelancersToEmployer } from './dto/assign-employerSavedFreelancersToEmployer.input';
import { FreelancerService } from '../freelancer/freelancer.service';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(EmployerRepository)
    private employerRepository: EmployerRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private freelancerService: FreelancerService,
  ) {}

  async getEmployers(): Promise<Employer[]> {
    return this.employerRepository.find();
  }

  async createEmployer(
    data: CreateEmployerInput,
    user: User,
  ): Promise<Employer> {
    const employer = {
      ...data,
      employerId: await uuid(),
      modifiedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      userEmployerUserId: user.userId,
    };
    const result = this.employerRepository.create(employer);
    result.employerSavedFreelancers = data.employerSavedFreelancers;

    await this.employerRepository.save(result);

    return result;
  }

  async deleteEmployer(user: User): Promise<Employer> {
    const employer = await this.employerRepository.findOne({
      userEmployerUserId: user.userId,
    });
    await this.employerRepository.delete({ userEmployerUserId: user.userId });
    return employer;
  }

  async userEmployer(employer: Employer): Promise<User> {
    return this.userService.userEmployer(employer);
  }

  async employer(user: User): Promise<Employer> {
    return this.employerRepository.findOne({ userEmployerUserId: user.userId });
  }

  async assignEmployerSavedFreelancersToEmployer(
    data: AssignEmployerSavedFreelancersToEmployer,
  ): Promise<Employer> {
    const { employerId, freelancersId } = data;
    const result = await this.employerRepository.findOne({ employerId });
    if (result.employerSavedFreelancers) {
      result.employerSavedFreelancers = [
        ...new Set(...result.employerSavedFreelancers, ...freelancersId),
      ];
    } else {
      result.employerSavedFreelancers = freelancersId;
    }
    return this.employerRepository.save(result);
  }

  async employerSavedFreelancers(employer: Employer): Promise<Freelancer[]> {
    return this.freelancerService.getManyFreelancers(
      employer.employerSavedFreelancers,
    );
  }
}
