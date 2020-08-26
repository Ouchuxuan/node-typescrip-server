import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Role } from './Role';


// User与Role是多对多的关系
@Entity()
export class User {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    @Column({ type: 'varchar', length: 20 })
    user_name: string;

    @Column({ type: 'varchar', length: 120 })
    password: string;

    @Column({ type: 'datetime' })
    create_time: string;

    @ManyToMany(type => Role, role=>role.users,{
        eager:true
    })
    @JoinTable()
    roels: Role[]

}
