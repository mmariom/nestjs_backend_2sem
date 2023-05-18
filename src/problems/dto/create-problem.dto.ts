import { Category } from "src/category/entities/category.entity";
import { Tenant } from "../../authentication/entities/tenant.entity";

export class CreateProblemDto {
//     @Type(() => NationalDto)
//   @Expose()
  tenant: Tenant



    constructor(public subject: string, public description: string, public category: Category ,public imageUrl?: string[]) {}
}
