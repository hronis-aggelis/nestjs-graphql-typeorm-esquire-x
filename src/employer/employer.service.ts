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
      userEmployer: user,
      //userEmployerUserId: user.userId,
    };
    const result = this.employerRepository.create(employer);
    result.employerSavedFreelancers = data.employerSavedFreelancers;

    await this.employerRepository.save(result);

    return result;
  }

  async deleteEmployer(user: User): Promise<Boolean> {
    // const employer = await this.employerRepository.findOne({
    //   //userEmployerUserId: user.userId,
    //   userEmployer: user,
    // });
    //await this.employerRepository.remove(employer);
    const result = await this.employerRepository.delete({ userEmployer: user });
    if (result.affected > 0) {
      //if (user) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not delete User!!');
    }

    //await this.employerRepository.delete({ employerId: employer.employerId });
    //return employer;
  }

  async userEmployer(employer: Employer): Promise<User> {
    return this.userService.userEmployer(employer);
  }

  async employer(user: User): Promise<Employer> {
    return this.employerRepository.findOne({ userEmployer: user });
  }

  async assignEmployerSavedFreelancersToEmployer(
    user: User,
    data: AssignEmployerSavedFreelancersToEmployer,
  ): Promise<Employer> {
    const { freelancersId } = data;
    //const result = await this.employerRepository.findOne({ employerId });
    const result = await this.employerRepository.findOne({
      userEmployer: user,
    });

    if (
      Array.isArray(result.employerSavedFreelancers) &&
      result.employerSavedFreelancers.length
    ) {
      result.employerSavedFreelancers = [
        ...new Set([...result.employerSavedFreelancers, ...freelancersId]),
      ];
    } else {
      result.employerSavedFreelancers = freelancersId;
    }

    const assign = await this.employerRepository.save(result);

    await this.freelancerService.getManyFreelancers2(freelancersId, result);

    return assign;
  }

  async employerSavedFreelancers(employer: Employer): Promise<Freelancer[]> {
    // return employer.employerSavedFreelancers
    return this.freelancerService.getManyFreelancers(
      employer.employerSavedFreelancers,
    );
  }
}
