import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Legends } from './legends.entity';

@Entity({ name: 'locations' })
export class Locations {
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
    nullable: false,
  })
  department: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  touristInfo: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  // Relaciones
  @OneToMany(() => Legends, legend => legend.location)
  legends: Legends[];
}

