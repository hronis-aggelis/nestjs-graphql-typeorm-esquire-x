import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth-jwt-utils/jwt.strategy';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { UserRepository } from './user.repository';
import { EmployerModule } from '../employer/employer.module';

@Module({
  imports: [
    forwardRef(() => FreelancerModule),
    forwardRef(() => EmployerModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'topsecret51',
      signOptions: { expiresIn: 86400 },
    }),
  ],
  providers: [UserResolver, UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
