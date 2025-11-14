import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/roles.enum";

@Entity({name:'credentials'})
export class CredentialsEntity {
   @PrimaryGeneratedColumn('uuid')
   uuid: string;

   @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
   })
   userName: string;
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
   })
   password: string;

   @Column({    
        type: 'enum',
        enum:Role,
        default: Role.USER
    })
    role: Role;

   @Column({    
        type: 'boolean',
        default: true
   })
   isActive: boolean;


}