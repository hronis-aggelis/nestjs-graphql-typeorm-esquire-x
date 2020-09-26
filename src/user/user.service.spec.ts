import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { FreelancerService } from '../freelancer/freelancer.service';
import { JwtStrategy } from './auth-jwt-utils/jwt.strategy';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Freelancer } from '../freelancer/freelancer.entity';
import {
  TypeOrmModule,
  InjectRepository,
  getRepositoryToken,
  getCustomRepositoryToken,
} from '@nestjs/typeorm';
import {
  forwardRef,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserModule } from './user.module';
import { UserRepository } from './user.repository';

const mockUserDto = {
  default_card_ID: '123',
  emailTemp: '123',
  firstName: 'hronis',
  lastName: 'aggelis',
  isEmployer: false,
  notification: false,
  StripeCostumerID: '123',
  userAdmin: false,
  email: 'hronis@hotmail.com',
  slug: 'hronis_agg',
  password: '12345678',
};

const modifiedDate = new Date().toISOString();
const createdDate = new Date().toISOString();

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

describe('UserService', () => {
  let userRepository;
  let userService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'topsecret51',
          signOptions: { expiresIn: 3600 },
        }),
        //TypeOrmModule.forFeature([User, UserRepository]),
        //FreelancerModule,
        //TypeOrmModule.forFeature([User]),
        //TypeOrmModule.forFeature([Freelancer]),
      ],
      providers: [
        UserService,
        JwtService,
        //forwardRef(() => FreelancerService),
        //FreelancerService,
        //UserResolver,
        //UserRepository,
        //Repository,
        //{ provide: UserService, useExisting: UserService }, //useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockUserRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: FreelancerService, useFactory: mockUserRepository },
      ],
    }).compile();

    userService = await module.get<UserService>(UserService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('getUsers', () => {
    it('gets all users from the repository', async () => {
      userRepository.find.mockResolvedValue('someValue');

      expect(userRepository.find).not.toHaveBeenCalled();
      const result = await userService.getUsers();
      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getUserById', () => {
    it('gets a user by id', async () => {
      userRepository.findOne.mockResolvedValue({
        ...mockUserDto,
        userId: '1',
        modifiedDate,
        createdDate,
      });

      expect(userRepository.findOne).not.toHaveBeenCalled();
      const result = await userService.getUserById('123');
      expect(userRepository.findOne).toHaveBeenCalledWith('123');
      expect(result).toMatchObject<User>({
        ...mockUserDto,
        userId: '1',
        modifiedDate,
        createdDate,
      });
    });

    it('throws an error if user was not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(userService.getUserById('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('successfully signs up user', async () => {
      userRepository.save.mockResolvedValue(undefined);
      expect(userService.createUser(mockUserDto)).resolves.not.toThrow();
    });

    it('throws Conflict Exception if username exists', async () => {
      userRepository.save.mockRejectedValue({ code: '23505' });
      await expect(userService.createUser(mockUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws an Internal Server Exception if error code not 23505', async () => {
      userRepository.save.mockRejectedValue({ code: '23506' });
      await expect(userService.createUser(mockUserDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteUser', () => {
    it('it throws because user could not be found', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      await expect(userService.deleteUser(new User())).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('deletes a user', async () => {
      userRepository.findOne.mockResolvedValue(new User());
      userRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(userService.deleteUser(new User())).resolves.toMatchObject<
        User
      >(new User());
    });
  });

  describe('updateUser', () => {
    it('it throws because user could not be found', async () => {
      userRepository.update.mockResolvedValue({});
      userRepository.findOne.mockResolvedValue(undefined);

      await expect(userService.updateUser({}, new User())).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
