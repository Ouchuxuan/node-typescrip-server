import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,CreateDateColumn } from "typeorm";
import { Role } from './Role';


// User与Role是多对多的关系
@Entity()
export class User {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 20, unique:true })
    user_name: string;

    @Column({ type: 'varchar', length: 120 })
    password: string;

    @CreateDateColumn()
    create_time: Date;

    @ManyToMany(type => Role, role => role.users, {
        eager: true
    })
    @JoinTable()
    roels: Role[]

}
