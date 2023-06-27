// typeorm.config.ts

import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';

const config: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'tensorexchange',
  autoLoadModels: true,
  synchronize: true,
};

export default config;
