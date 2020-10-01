// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../user/user.entity';
// import { Repository, getRepository } from 'typeorm';
// import { Employer } from './employer.entity';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'topsecret51',
//     });
//   }

//   async validate(email: { email }): Promise<Employer> {
//     const user = await this.userRepository.findOne(
//       {
//         email: email.email,
//       },
//       //{ relations: ['employer'] },
//     );
//     const employer = await getRepository(Employer).findOne({
//       userEmployer: user,
//     });
//     //console.log(employer);

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     return employer;
//   }
// }
