import {
  Controller,
  Post,
  UseGuards,
  Request as Request2,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request2() req) {
    return this.authService.login(req.user);
  }
  
  // @Post('/signup')
  // async signup(@Request2() req) {
  //   // console.log("body", req.body);
    
  //   return this.authService.signup(req.body);
  // }

  @Post('/signup-tenant')
  async signup_tenant(@Request2() req) {
    // console.log("body", req.body);
    
    return this.authService.signup_tenant(req.body);
  }
}

