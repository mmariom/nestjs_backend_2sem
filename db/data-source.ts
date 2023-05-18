

// import { DataSource,DataSourceOptions } from "typeorm";


// export const dataSourceOptions: DataSourceOptions = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'admin',
//     password: 'admin',
//     database: 'elective',
//     entities: ['dist/**/*.entity.js'],
//     migrations: ['dist/db/migrations/*.js'],



// }

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;


// commands  
//  npm run migration:generate -- db/migrations/newmig
//  npm run migration:run
// npx typeorm migration:create db/migrations/test


// import { ConfigService } from '@nestjs/config';
// import { DataSource, DataSourceOptions } from "typeorm";

// export function dataSourceOptions(configService: ConfigService): DataSourceOptions {
//   return {
//     type: 'postgres',
//     host: configService.get('DB_HOST'),
//     port: configService.get('DB_PORT'),
//     username: configService.get('DB_USERNAME'),
//     password: configService.get('DB_PASSWORD'),
//     database: configService.get('DB_NAME'),
//     entities: ['dist/**/*.entity.js'],
//     migrations: ['dist/db/migrations/*.js'],
//   };
// }

// export const dataSourceProvider = {
//   provide: 'DataSource',
//   useFactory: (configService: ConfigService) => new DataSource(dataSourceOptions(configService)),
//   inject: [ConfigService],
// };

// export default dataSourceProvider;



// import { ConfigService } from '@nestjs/config';
// import { DataSource, DataSourceOptions } from 'typeorm';

// const configService = new ConfigService();

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: configService.get('DB_HOST'),
//   port: configService.get('DB_PORT'),
//   username: configService.get('DB_USERNAME'),
//   password: configService.get('DB_PASSWORD'),
//   database: configService.get('DB_NAME'),
//   entities: ['dist/**/*.entity.js'],
//   migrations: ['dist/db/migrations/*.js'],
// };

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;



import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config()



export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
