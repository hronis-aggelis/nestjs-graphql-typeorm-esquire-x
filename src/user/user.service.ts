import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  Inject,
  forwardRef,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/user.input';
import { v4 as uuid } from 'uuid';
import { PartialType } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/user-update.input';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from './models/token.model';
import * as bcrypt from 'bcryptjs';
import { FreelancerService } from '../freelancer/freelancer.service';
import { Freelancer } from '../freelancer/freelancer.entity';
import { validate } from 'class-validator';
import { UserRepository } from './user.repository';
import { EmployerService } from '../employer/employer.service';
import { Employer } from '../employer/employer.entity';

@Injectable()
export class UserService {
  constructor(
    //@InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject(forwardRef(() => FreelancerService))
    private freelancerService: FreelancerService,
    @Inject(forwardRef(() => EmployerService))
    private employerService: EmployerService,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!!');
    }

    return user;
  }

  async getMyProfile(currentUser: User): Promise<User> {
    return this.userRepository.findOne(currentUser.userId);
  }

  async signIn(email: string, password: string): Promise<TokenType> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new InternalServerErrorException('Something went wrong!!');

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials!!');
    }
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = {
      ...data,
      userId: uuid(),
      modifiedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
    };
    const result = this.userRepository.create(user);

    try {
      await this.userRepository.save(result);
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists!!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(data: UpdateUserInput, currentUser: User): Promise<User> {
    await this.userRepository.update(currentUser.userId, {
      ...data,
      modifiedDate: new Date().toISOString(),
    });

    const user = await this.userRepository.findOne(currentUser.userId);

    if (user) {
      return user;
    } else {
      throw new InternalServerErrorException('Could not update User Info!!');
    }
  }

  async deleteUser(currentUser: User): Promise<User> {
    const user = await this.userRepository.findOne(currentUser.userId);

    if (user) {
      const result = await this.userRepository.delete(currentUser.userId);
      //const result = await this.userRepository.remove(user);
      if (result.affected > 0) {
        //if (user) {
        return user;
      } else {
        throw new InternalServerErrorException('Could not delete User!!');
      }
    } else {
      throw new InternalServerErrorException('Could not delete User!!');
    }
  }

  async freelancer(user: User): Promise<Freelancer> {
    return this.freelancerService.freelancer(user);
    //return this.freelancerRepository.findOne({ userUserId: user.userId });
    // return this.freelancerRepository.findOne({
    //   freelancerId: user.freelancerId,
    // });
    // const freelancers = await this.freelancerRepository.find({
    //   relations: ['User'],
    // });
    // const currentfreelancer = freelancers.filter(
    //   currentFreelancer => currentFreelancer.user.userId === user.userId,
    // )[0];
    // return currentfreelancer;
    // return this.freelancerRepository.findOne({
    //   //freelancerId: user.freelancer.freelancerId,
    //   freelancerId:
    // });
  }

  async employer(user: User): Promise<Employer> {
    return this.employerService.employer(user);
  }

  async user(freelancer: Freelancer): Promise<User> {
    return this.userRepository.findOne(freelancer.userUserId);
  }

  async userEmployer(employer: Employer): Promise<User> {
    return this.userRepository.findOne(employer.userEmployerUserId);
  }
}
