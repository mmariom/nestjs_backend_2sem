import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';
import { AuthModule } from './authentication/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';


@Module({
 imports: [
   ConfigModule.forRoot({ isGlobal: true }),
   MulterModule.register({
    dest: './files',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'files')
  }),
   TypeOrmModule.forRootAsync({
     imports: [ConfigModule],
     useFactory: (configService: ConfigService) => ({
       type: 'postgres',
       host: configService.get('DB_HOST'),
       port: +configService.get<number>('DB_PORT'),
       username: configService.get('DB_USERNAME'),
       password: configService.get('DB_PASSWORD'),
       database: configService.get('DB_NAME'),
       entities: ['dist/**/*.entity.js'],
       migrations: ['dist/migrations/*.js'],
       synchronize: false, // Change this to false
       autoLoadEntities: true,
       
     }),
     inject: [ConfigService],
   }),
   ProblemsModule,
   AuthModule,
   CategoryModule,
 ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}









// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { BookingsModule } from './bookings/bookings.module';
// import { ProblemsModule } from './problems/problems.module';
// import { AuthModule } from './authentication/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { MulterModule } from '@nestjs/platform-express/multer';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
// import { TodosModule } from './todos/todos.module';
// import { dataSourceOptions } from 'db/data-source';
// import { CategoryModule } from './category/category.module';


// @Module({
//  imports: [
//    ConfigModule.forRoot({ isGlobal: true }),
//    MulterModule.register({
//     dest: './files',
//   }),
//   ServeStaticModule.forRoot({
//     rootPath: join(__dirname, '..', 'files')
//   }),
//    TypeOrmModule.forRoot(dataSourceOptions),
//    BookingsModule,
//    ProblemsModule,
//    TodosModule,
//    AuthModule,
//  ],
//  controllers: [AppController],
//  providers: [AppService],
// })
// export class AppModule {}






