import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';


import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../authentication/auth.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Category } from './entities/category.entity';

@Module({
    
  imports:[TypeOrmModule.forFeature([Category]), AuthModule, HttpModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
