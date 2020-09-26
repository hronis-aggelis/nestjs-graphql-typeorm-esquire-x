import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost', //dbConfig.host,
  port: 5432, //dbConfig.port,
  username: 'postgres', //dbConfig.username,
  password: 'postgres', //dbConfig.password,
  database: 'esquire', //dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
