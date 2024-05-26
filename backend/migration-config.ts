import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: '.env',
});
export const dataSource = new DataSource({
  type: (process.env.DB_TYPE ?? 'mysql') as 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306'),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? '',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['migrations/**/*{.ts,.js}'],
  logging: true,
  synchronize: false,
});
