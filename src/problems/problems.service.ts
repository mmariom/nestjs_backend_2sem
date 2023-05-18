import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { FindOneOptions } from 'typeorm';


@Injectable()
export class ProblemsService {
  constructor(@InjectRepository(Problem) 
  private problemRepository: Repository<Problem>,
  private readonly httpService: HttpService) {}


  async saveImage(base64EncodedImage: string): Promise<string> {
    const formData = new FormData();
      formData.append('image', base64EncodedImage);
      const { data: imageData } = await firstValueFrom(
        this.httpService
          .post(
            `https://freeimage.host/api/1/upload?key=${process.env.IMG_API_KEY}`,
            formData,
          )
          .pipe(
            catchError((error: AxiosError) => {
              console.log("error!!!!!");
              throw error;
            }),
          ),
      );
      return imageData.image.display_url;
  }



  async create(createProblemDto: CreateProblemDto, files: Array<Express.Multer.File>) {
    try {
    // First save other problem data without images
    const problem = await this.problemRepository.save(createProblemDto)
  
    // Then upload images
    const base64Photos = [];
    const displayUrls = [];
  
    for (const file of files) {
      const base64Photo = file.buffer.toString('base64');
      base64Photos.push(base64Photo);
  
      const displayUrl = await this.saveImage(base64Photo);
      displayUrls.push(displayUrl);
    }
  
    // Update the problem with image urls
    problem.imageUrl = displayUrls;
    
    // Save and return the updated problem
    return this.problemRepository.save(problem);
    } catch (error) {
      throw new Error('Error creating problem. Please try again.');
    }
  }

  // async create(createProblemDto: CreateProblemDto, files: Array<Express.Multer.File>) {
  //   // First save other problem data without images
  //   const problem = await this.problemRepository.save(createProblemDto)
  
  //   // Then upload images
  //   const base64Photos = [];
  //   const displayUrls = [];
  
  //   for (const file of files) {
  //     const base64Photo = file.buffer.toString('base64');
  //     base64Photos.push(base64Photo);
  
  //     const displayUrl = await this.saveImage(base64Photo);
  //     displayUrls.push(displayUrl);
  //   }
  
  //   // Update the problem with image urls
  //   problem.imageUrl = displayUrls;
    
  //   // Save and return the updated problem
  //   return this.problemRepository.save(problem);
  // }

  


  

  async findOneSingleUsersProblem(id: number, tenantId: number) {
    const problem = await this.problemRepository.findOne({
      where: {
        id: id,
        tenant: {
          id: tenantId
        }
      },
    });

    if (!problem) {
      throw new Error('Problem not found or you are not authorized to access it.');
    }

    return problem;
  }


  async findAllUsersProblems(tenantId: number) {
    try {
      return await this.problemRepository.find({
        relations: {
    category: true,
    
  },
    where: {
        tenant: {
            id: tenantId
        }
    }
});
    } catch (error) {
      throw new Error('Error retrieving problems. Please try again.');
    }
  }

//   async findAllUsersProblems(tenantId: number) {
//     return await this.problemRepository.find({
//             relations: {
//         category: true,
        
//       },
//         where: {
//             tenant: {
//                 id: tenantId
//             }
//         }
//     });
// }


async updateProblem(id: number, tenantId: number, updateProblemDto: UpdateProblemDto, newImageFiles?: Array<Express.Multer.File>) {
  // Find the problem that belongs to the user
  const problem = await this.problemRepository.findOne({
    where: {
      id: id,
      tenant: {
        id: tenantId
      }
    },
  });

  // If problem is not found or does not belong to the user, throw an error
  if (!problem) {
    throw new Error('Problem not found or you are not authorized to update it.');
    
  }

  // Update the problem with the new data (excluding imageUrls)
  problem.subject = updateProblemDto.subject;
  problem.description = updateProblemDto.description;
  problem.category = updateProblemDto.category;

  // Save the problem with the updated text fields
  await this.problemRepository.save(problem);

  // Process new images if they are provided
  if (newImageFiles && newImageFiles.length > 0) {
    // Upload new images to remote server and get the URLs
    const newImageUrls = [];
    for (const file of newImageFiles) {
      const base64Photo = file.buffer.toString('base64');
      const displayUrl = await this.saveImage(base64Photo);
      newImageUrls.push(displayUrl);
    }
  
    // Update the problem with the new image URLs
    problem.imageUrl = newImageUrls;
  
    // Save the problem with the updated image URLs
    await this.problemRepository.save(problem);
  }

  return problem;
}




   async removeOneSingleUsersProblem(id: number, tenantId: number) {


    const problem = await this.problemRepository.findOne({
      where: {
        id: id,
        tenant: {
          id: tenantId
        }
      },
    });
  
    // If problem is not found or does not belong to the user, throw an error
    if (!problem) {
      throw new Error('Problem not found or you are not authorized to delete it.');
    }
  
    // If problem belongs to the tenant, delete it
    return this.problemRepository.delete(id);
  }
  

  


  

  // Admin specific methods



  async findAll() {
    try {
      return await this.problemRepository.find(
        {
          relations: {
            tenant: {user:true},
            category: true
    
          }
      }
      );
    } catch (error) {
      throw new Error('Error retrieving problems. Please try again.');
    }
  }


  // async findAll() {
  //   return await this.problemRepository.find(
  //     {
  //       relations: {
  //         tenant: {user:true},
  //         category: true
  
  //       }
  //   }
  //   );
  // }



  // async findOne(id: number) {
  //   const problem = await this.problemRepository.findOne({ id: id });

  //   if (!problem) {
  //     throw new Error('Problem not found.');
  //   }

  //   return problem;
  // }


  async findOne(id: number) {
    try{
     return await this.problemRepository.find({
      relations: {
        tenant: {user:true},
        category: true,
        

      },
      where: {
          id: id
      },
  })} catch (error) {
    throw new Error('Problem not found.');
  }
  
}



}
