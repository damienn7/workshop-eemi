import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { getEnv } from '../utils/env.js';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: getEnv('DB_HOST'),
  port: Number(getEnv('DB_PORT')),
  username: getEnv('DB_USER'),
  password: getEnv('DB_PASSWORD'),
  database: getEnv('DB_NAME'),
  synchronize: true,
  logging: false,
  entities: ['src/entities/**/*.ts'],
});
