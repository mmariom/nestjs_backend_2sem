import { Role } from '../../users/role';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name: string;
  
  
  @Column({ nullable: false })
  password: string;

  @OneToOne(type => Tenant, tenant => tenant.user)
	tenant: Tenant | null

  @Column({
    type:"enum", 
    enum: Role, 
    default: [Role.User]
  })
  role: Role;
}

function Prop(arg0: { required: boolean; }): (target: UserEntity, propertyKey: "username") => void {
  throw new Error('Function not implemented.');
}
