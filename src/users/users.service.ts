import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministratorEntity } from '../authentication/entities/admin.entity';
import { Tenant } from '../authentication/entities/tenant.entity';
import { UserEntity } from '../authentication/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './role';

import { ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserProfileDto } from './UserProfileDto';


// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
  @InjectRepository(AdministratorEntity) private boardMemberRepository: Repository<AdministratorEntity>) {}

    async findUserById(id: number) : Promise<UserEntity> {
        return this.userRepository.findOne({where: {id: id}});
    }

    // async findOne(username: string): Promise<UserEntity> {
    //     const result = await this.userRepository.findOne({where: {username: username}, relations: {tenant: true}});
    //     // console.log("findOne user service", result);
        
    //     return result;
    // }

    // async create(username: string, password: string) : Promise<User> {
    //     return this.userRepository.save({username, password})
    // }

    // async create_board_member(username: string, password: string, phone: string) : Promise<AdministratorEntity> {
    //     const user: User = {username, password, role: Role.Admin};
        
    //     const savedUser = await this.userRepository.save(user);
    //     const boardmember = { phone, user: savedUser }
    //     const savedBoardMember = await this.boardMemberRepository.save(boardmember);

    //     return savedBoardMember;
    // }

    // async create_tenant(username: string, password: string, email: string, name: string) : Promise<Tenant> {
    //     const user: User = {username, password,name};
        
    //     const savedUser = await this.userRepository.save(user);
    //     const tenant = { email, user: savedUser }
    //     const savedTenant = await this.tenantRepository.save(tenant);

    //     return savedTenant;

    //     // An example to retrieve data with related data. Can be used for 
    //     // finding one tenant or one board member.
    //     // const result = await this.tenantRepository.findOne({ where: 
    //     //     {
    //     //         id: savedTenant.id
    //     //     }, relations: {
    //     //         user: true
    //     //     }
    //     // }    
    //     // );
    //     // console.log("result", result);
    //     // return result;
    //     // await this.userRepository.save({username, password}); // Never save passwords in clear text!
        
    // }



// ...

// async create_tenant(username: string, password: string, email: string, name: string) : Promise<Tenant> {
//   if (!username || !password || !email || !name) {
//     throw new BadRequestException('username, password, email, and name are required.');
//   }

//   const existingUserByUsername = await this.userRepository.findOne({ where: { username } });
//   const existingUserByEmail = await this.tenantRepository.findOne({ where: { email } });

//   if (existingUserByUsername || existingUserByEmail) {
//     throw new ConflictException('Username or Email already exists.');
//   }

//   const user: User = {username, password,name};
//   const savedUser = await this.userRepository.save(user);
//   const tenant = { email, user: savedUser }
//   const savedTenant = await this.tenantRepository.save(tenant);
//   return savedTenant;
// }


async create_tenant(username: string, password: string, email: string, name: string) : Promise<Tenant> {
    if (!username || !password || !email || !name) {
      throw new BadRequestException('username, password, email, and name are required.');
    }
  
    const existingUserByUsername = await this.userRepository.findOne({ where: { username } });
    const existingUserByEmail = await this.tenantRepository.findOne({ where: { email } });
  
    if (existingUserByUsername || existingUserByEmail) {
      throw new ConflictException('Username or Email already exists.');
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const user: User = {username, password: hashedPassword, name};
    const savedUser = await this.userRepository.save(user);
    const tenant = { email, user: savedUser }
    const savedTenant = await this.tenantRepository.save(tenant);
    return savedTenant;
  }
  


  async findOne(username: string): Promise<UserEntity> {
    if (!username) {
      throw new BadRequestException('Username is required.');
    }
  
    const result = await this.userRepository.findOne({ where: { username }, relations: { tenant: true } });
    if (!result) {
      throw new BadRequestException('User does not exist.');
    }
  
    return result;
  }

  





// async findUserProfile(tenantId: number): Promise<UserEntity> {
//     const user = await this.userRepository.findOne({
//       relations: ['tenant'],
//       where: { tenant: { id: tenantId } },
//     });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     return user;
//   }


  async findUserProfile(tenantId: number): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      relations: ['tenant'],
      where: { tenant: { id: tenantId } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    //just and example how we can  map values from repository to dto
    // in initial response we also getting hashed password, so we need to remove it
    // we can also use class-transformer library to do it or mapper....
    const userProfileDto = new UserProfileDto({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      tenant: {
        id: user.tenant.id,
        email: user.tenant.email,
      },
    });

    return userProfileDto;
  }



    
}



