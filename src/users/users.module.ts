import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorEntity } from '../authentication/entities/admin.entity';
import { Tenant } from '../authentication/entities/tenant.entity';
import { UserEntity } from '../authentication/entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity, Tenant, AdministratorEntity])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
