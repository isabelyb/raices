import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env.development' });
console.log("DEBUG ENV FILE >>>");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD:", JSON.stringify(process.env.DB_PASSWORD));

const config: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  logging: false,
  synchronize: true, // ⚠️ Solo para desarrollo - TypeORM crea/actualiza tablas automáticamente
  dropSchema: false,
  migrationsTableName: 'migrations_history',
};
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);

