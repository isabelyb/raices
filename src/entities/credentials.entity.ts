
import { Role } from 'src/enums/roles.enum';
import { User } from './users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

   // Relaciones
   @OneToOne(() => User, user => user.credential, { onDelete: 'CASCADE' })
   @JoinColumn()
   user: User;

}