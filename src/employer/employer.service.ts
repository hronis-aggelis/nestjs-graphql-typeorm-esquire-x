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

  async getEmployerById(user: User): Promise<Employer> {
    return this.employerRepository.findOne(
      {
        userEmployer: user,
      },
      //{ relations: ['employerSavedFreelancers'] },
    );
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
    };

    const result = this.employerRepository.create(employer);

    await this.employerRepository.save(result);

    return result;
  }

  async deleteEmployer(user: User): Promise<Boolean> {
    const result = await this.employerRepository.delete({ userEmployer: user });
    if (result.affected > 0) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not delete User!!');
    }
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
    //const employer = await this.getEmployerById(user);
    const employer = await this.employerRepository.findOne(
      {
        userEmployer: user,
      },
      { relations: ['employerSavedFreelancers'] },
    );
    console.log(employer);
    const freelancers = await this.freelancerService.getManyFreelancers(
      freelancersId,
    );

    //needs checking, an valw cascade true mallon to call sto assignEmployerToFreelancers einai axristo
    if (
      Array.isArray(employer.employerSavedFreelancers) &&
      employer.employerSavedFreelancers.length
    ) {
      employer.employerSavedFreelancers = [
        ...new Set([...employer.employerSavedFreelancers, ...freelancers]),
      ];
    } else {
      employer.employerSavedFreelancers = freelancers;
    }

    const assign = await this.employerRepository.save(employer);

    // await this.freelancerService.assignEmployerToFreelancers(
    //   freelancersId,
    //   employer,
    // );

    return assign;
  }

  // async employerSavedFreelancers(employer: Employer): Promise<Freelancer[]> {
  //   const employerWithFreelancers = await this.employerRepository.findOne(
  //     employer.employerId,
  //     { relations: ['employerSavedFreelancers'] },
  //   );

  //   return employerWithFreelancers.employerSavedFreelancers;
  // }
}
