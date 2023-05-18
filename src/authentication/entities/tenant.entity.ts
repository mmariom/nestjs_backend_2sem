import { Problem } from '../../problems/entities/problem.entity';
import { Role } from 'src/users/role';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
} from "typeorm"
import { UserEntity } from './user.entity';


@Entity()
export class Tenant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    email: string;
  
    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity

    @OneToMany(() => Problem, (problem) => problem.tenant)
    problem: Problem
}