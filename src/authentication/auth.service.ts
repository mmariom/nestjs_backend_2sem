import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup_tenant(user: any) {
    // console.log("username ", user.username);
    // console.log("password ", user.password);
    // console.log("email ", user.email);
    // console.log("name ", user.name);


    return this.usersService.create_tenant(user.username, user.password, user.email, user.name);
  }
  // async signup_board_member(user: any) {
  //   return this.usersService.create_board_member(user.username, user.password, user.phone);
  // }
  // async signup(user: any) {
  //   return this.usersService.create(user.username, user.password);
  // }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   // console.log("user found", user);

  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     // console.log("user found removed password", result);
      
  //     return result;
  //   }
  //   return null;
  // }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   throw new BadRequestException('Password is incorrect.');
  // }
  

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
  
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new BadRequestException('Password is incorrect.');
  }

  async login(user: any) {
    // console.log("user in login auth.service", user);
    
    const payload = { 
      username: user.username, 
      id: user.id, 
      tenantId: user.tenant?.id,
      role: user.role
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


