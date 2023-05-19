import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, UploadedFiles, Req, Patch, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from './../authentication/jwt-auth.guard';
import { UsersService } from './../users/users.service';
import { TenantGuard } from './../authentication/tenant.guard';




@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}




@UseGuards(JwtAuthGuard, TenantGuard)
@Get('/profile')
async findUserProfile(@Request() req: any) {
    // console.log("req.user", req.user);
  try {
    return await this.usersService.findUserProfile(req.user.tenantId);
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}




  
}
