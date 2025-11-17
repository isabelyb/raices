
import { Role } from 'src/enums/roles.enum';

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({name:'credential'})
export class CredentialsEntity {
   @PrimaryGeneratedColumn('uuid')
   uuid: string;

   @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
   })
   username: string;
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

       @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt: Date; 

   // Relaciones
   @OneToOne(() => User, user => user.credential, { onDelete: 'CASCADE' })
   @JoinColumn()
   user: User;

}