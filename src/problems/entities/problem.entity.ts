import { Category } from "src/category/entities/category.entity";
import { Tenant } from "../../authentication/entities/tenant.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subject: string

    @Column()
    description: string;

    @Column({type: 'text', array: true,nullable:true})
    imageUrl: string[];


    @ManyToOne(() => Tenant, (tenant) => tenant.problem)
    tenant: Tenant


    @ManyToOne(() => Category, (category) => category.problems)
    category: Category
}
