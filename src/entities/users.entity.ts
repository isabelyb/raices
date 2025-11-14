import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { CredentialsEntity } from './credentials.entity';
import { Legends } from './legends.entity';

@Entity({ name: 'users' })
export class User {
    
  @PrimaryGeneratedColumn('uuid')
  uuid: string;


    @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;


    @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lastname: string;


    @Column({
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  Phone: string;


    @Column({
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string;


  @Column({
    type: 'varchar',
    length: 150,
    unique: false,
    nullable: false,
  })
  Location: string;


  @Column({
    type: 'boolean',
    default: true,     
  })
  isActive: boolean;

    @Column({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  // Relaciones
  @OneToOne(() => CredentialsEntity, credential => credential.user)
  credential: CredentialsEntity;

  @ManyToMany(() => Legends)
  @JoinTable({ name: 'user_favorites' })
  favorites: Legends[];

}

