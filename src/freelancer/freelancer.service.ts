import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  Inject,
  forwardRef,
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

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(FreelancerRepository)
    private freelancerRepository: FreelancerRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private categoryService: CategoryService,
  ) {}

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
      //if (user) {
      return true;
    } else {
      throw new InternalServerErrorException('Could not delete Freelancer!!');
    }
    // const freelancer = await this.freelancerRepository.findOne({
    //   //userUserId: user.userId,
    //   user,
    // });
    // await this.freelancerRepository.remove(freelancer);
    // //await this.freelancerRepository.delete({ userUserId: user.userId });
    // return freelancer;
    // const users = await this.userRepository.find({ relations: ['freelancer'] });

    // const currentUser = users.filter(
    //   currentUser => currentUser.userId === user.userId,
    // )[0];

    // await this.freelancerRepository.delete(currentUser.freelancer.freelancerId);

    // return currentUser.freelancer;
  }

  async user(freelancer: Freelancer): Promise<User> {
    //   const freelancers = await this.freelancerRepository.find({
    //     relations: ['User']})
    //   const currentFreelancer = freelancers.filter(
    //   currentFreelancer => currentFreelancer.user === freelancer.,
    // )[0];
    //console.log(freelancer.user);
    return this.userService.user(freelancer);
    //return this.userRepository.findOne(freelancer.userUserId);

    // return this.userRepository.findOne({
    //   freelancer, //freelancerId: freelancer.freelancerId.,
    //});
    //return this.userRepository.findOne({ userId: freelancer.userId }); //freelancer.userId });
  }

  async freelancer(user: User): Promise<Freelancer> {
    return this.freelancerRepository.findOne({
      //userUserId: user.userId
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

  async getManyFreelancers2(
    freelancersId: string[],
    employer: Employer,
  ): Promise<Boolean> {
    const freelancers = await this.freelancerRepository.findByIds(
      freelancersId,
    );
    await freelancers.map(freelancer =>
      Array.isArray(freelancer.SavedByThoseEmployers) &&
      freelancer.SavedByThoseEmployers.length
        ? (freelancer.SavedByThoseEmployers = [
            ...freelancer.SavedByThoseEmployers,
            employer,
          ])
        : (freelancer.SavedByThoseEmployers = [employer]),
    );
    await freelancers.map(freelancer =>
      this.freelancerRepository.save(freelancer),
    );
    return true;
    // if (freelancersId) {
    //   return this.freelancerRepository.findByIds(freelancersId);
    // }
  }
}
