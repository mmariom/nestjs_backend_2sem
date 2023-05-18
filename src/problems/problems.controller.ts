import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, UploadedFiles, Req, Patch, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { JwtAuthGuard } from './../authentication/jwt-auth.guard';
import { UsersService } from './../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './../authentication/admin.guard';
import { TenantGuard } from './../authentication/tenant.guard';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateProblemDto } from './dto/update-problem.dto';



@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService, private readonly usersService: UsersService) {}




  @UseGuards(JwtAuthGuard, TenantGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  async create(@Req() req, @Body() body, @UploadedFiles() files: Array<Express.Multer.File>) {
    try {

      let createProblemDto = new CreateProblemDto(body.subject, body.description, body.category);
      createProblemDto.tenant = (await this.usersService.findOne(req.user.username)).tenant;
    
      // Pass files to service's create method
      return this.problemsService.create(createProblemDto, files);

    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

//   @UseGuards(JwtAuthGuard, TenantGuard)
//   @UseInterceptors(AnyFilesInterceptor())
//   @Post("/create")
//   async create(@Req() req, @Body() body, @UploadedFiles() files: Array<Express.Multer.File>) {
//   console.log("body form data ", body);

//   let createProblemDto = new CreateProblemDto(body.subject, body.description, body.category);
//   createProblemDto.tenant = (await this.usersService.findOne(req.user.username)).tenant;

//   // Pass files to service's create method
//   return this.problemsService.create(createProblemDto, files);
// }



@UseGuards(JwtAuthGuard, TenantGuard)
@Get()
async findAllUsersProblems(@Request() req: any) {
  try {
    return await this.problemsService.findAllUsersProblems(req.user.tenantId);
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}

  // @UseGuards(JwtAuthGuard, TenantGuard)
  // @Get('/user/problems')
  // async findAllUsersProblems(@Request() req: any) {  

  //   return await this.problemsService.findAllUsersProblems(req.user.tenantId);
  // }


  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get('/:id')
  async findOneSingleUsersProblem(@Param('id') id: string, @Request() req: any) {
    try {
      return await this.problemsService.findOneSingleUsersProblem(+id, req.user.tenantId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  
  // @UseGuards(JwtAuthGuard, TenantGuard)
  // @Get('/user/problem/:id')
  // async findOneSingleUsersProblem(@Param('id') id: string, @Request() req: any) {
  //   return  await this.problemsService.findOneSingleUsersProblem(+id, req.user.tenantId);
    
  // }


  @UseGuards(JwtAuthGuard, TenantGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Patch('/:id')
  async updateOneSingleUsersProblem(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto,@Request() req: any,@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      return await this.problemsService.updateProblem(+id, req.user.tenantId, updateProblemDto, files);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }



  // @UseGuards(JwtAuthGuard, TenantGuard)
  // @UseInterceptors(AnyFilesInterceptor())
  // @Patch('/user/problem/:id')
  // async updateOneSingleUsersProblem(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto,@Request() req: any,@UploadedFiles() files: Array<Express.Multer.File>) {
  //   return await this.problemsService.updateProblem(+id, req.user.tenantId, updateProblemDto, files);
  // }




  @UseGuards(JwtAuthGuard, TenantGuard)
  @Delete('/:id')
  async removeOneSingleUsersProblem(@Param('id') id: string,@Request() req: any) {
    try {
      return await this.problemsService.removeOneSingleUsersProblem(+id, req.user.tenantId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // @UseGuards(JwtAuthGuard, TenantGuard)
  // @Delete('/user/problem/:id')
  // async removeOneSingleUsersProblem(@Param('id') id: string,@Request() req: any) {
  //   return  await this.problemsService.removeOneSingleUsersProblem(+id, req.user.tenantId);

  // }




  // Admin specific routes


  // @UseGuards(JwtAuthGuard, AdminGuard)
  // @Get('/all')
  // async findAll(@Request() req: any) {    
  //   return await this.problemsService.findAll();
  // }

  // @UseGuards(JwtAuthGuard, AdminGuard)
  // @Get('/problem/:id')
  // async findOne(@Param('id') id: string, @Request() req: any) {
  //   return  await this.problemsService.findOne(+id);
    
  // }


  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('/admin/all')
  async findAll(@Request() req: any) {
    try {
      return await this.problemsService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('/admin/:id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    try {
      return await this.problemsService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  
}
