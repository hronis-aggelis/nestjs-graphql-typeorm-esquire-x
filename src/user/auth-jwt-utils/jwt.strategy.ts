import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topsecret51',
    });
  }

  async validate(email: { email }): Promise<User> {
    const user = await this.userRepository.findOne(
      {
        email: email.email,
      },
      { relations: ['employer', 'freelancer'] },
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
