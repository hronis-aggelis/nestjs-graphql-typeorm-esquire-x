import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users1601153468370 } from '../db/migrations/1601153468370-Users';
import { Freelancers1601153486336 } from '../db/migrations/1601153486336-Freelancers';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost', //dbConfig.host,
  port: 5432, //dbConfig.port,
  username: 'postgres', //dbConfig.username,
  password: 'postgres', //dbConfig.password,
  database: 'esquire', //dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  //migrations: [__dirname + '/db/migrations/*{.ts,.js}'],
  // migrationsTableName: 'migrations_typeorm',
  // migrationsRun: true,
  // migrations: [Users1601153468370, Freelancers1601153486336],
  // cli: {
  //   // Location of migration should be inside src folder
  //   // to be compiled into dist/ folder.
  //   migrationsDir: 'src/db/migrations',
  // },
};

module.exports = typeOrmConfig;
