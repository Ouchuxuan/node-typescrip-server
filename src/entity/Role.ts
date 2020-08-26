import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './User'
@Entity()
export class Role {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar', length: 20, nullable: false })
  role_name: string

  @Column({ type: 'varchar', length: 255 })
  permission: string

  @ManyToMany(type => User, user => user.roels)
  users: User[]
}