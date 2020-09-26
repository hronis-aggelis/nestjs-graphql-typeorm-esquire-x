import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { FreelancerService } from '../freelancer/freelancer.service';
import { JwtStrategy } from './auth-jwt-utils/jwt.strategy';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Freelancer } from '../freelancer/freelancer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common';
import { UserResolver } from './user.resolver';

const mockUserService = () => ({
  getUsers: jest.fn(),
});

describe('UserResolver', () => {
  let userResolver;
  let userService;
  let freelancerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'topsecret51',
          signOptions: { expiresIn: 3600 },
        }),
        //FreelancerModule,
        //TypeOrmModule.forFeature([User]),
        //TypeOrmModule.forFeature([Freelancer]),
      ],
      providers: [
        UserService,
        JwtService,
        //forwardRef(() => FreelancerService),
        //FreelancerService,
        UserResolver,
        { provide: UserService, useFactory: mockUserService },
        { provide: JwtService, useFactory: mockUserService },
        //{ provide: Freelancer, useFactory: mockUserRepository },
        //{ provide: Repository, useFactory: mockUserRepository },
      ],
    }).compile();

    userResolver = await module.get<UserResolver>(UserResolver);
    userService = await module.get<UserService>(UserService);
    //userRepository = await module.get<Repository<User>>(); //new Repository<User>);
  });

  describe('getUsers', () => {
    it('gets all users from the repository', async () => {
      userService.getUsers.mockResolvedValue('someValue');

      expect(userService.getUsers).not.toHaveBeenCalled();
      const result = await userResolver.getUsers();
      expect(userService.getUsers).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
