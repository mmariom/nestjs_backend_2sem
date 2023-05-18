import { Problem } from "src/problems/entities/problem.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,  } from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    category: string

    @OneToMany(() => Problem, (problem) => problem.category)
    problems: Problem[]

}
