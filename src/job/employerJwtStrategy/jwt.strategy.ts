// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../../user/user.entity';
// import { Repository, getRepository } from 'typeorm';
// import { Employer } from '../../employer/employer.entity';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>,
//     @InjectRepository(Employer)
//     private employerRepository: Repository<Employer>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'topsecret51',
//     });
//   }

//   async validate(email: { email }): Promise<Employer | User> {
//     // const user = await this.userRepository.findOne(
//     //   {
//     //     email: email.email,
//     //   },
//     //   //{ relations: ['employer'] },
//     // );
//     // const employer = await getRepository(Employer).findOne(
//     //   {
//     //     userEmployer: user,
//     //   },
//     //   { relations: ['userEmployer'] },
//     // );
//     // console.log(employer);

//     const employer = await getRepository(Employer)
//       .createQueryBuilder('employers')
//       .innerJoinAndSelect('employers.userEmployer', 'userEmployer')
//       .where('userEmployer.email = :email', { email: email.email })
//       .getOne();

//     if (!employer) {
//       const user = await this.userRepository.findOne({
//         email: email.email,
//       });
//       if (!user) {
//         throw new UnauthorizedException();
//       }

//       return user;
//     }

//     return employer;
//   }
// }
