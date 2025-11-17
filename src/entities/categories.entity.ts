import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Legends } from './legends.entity';

@Entity({ name: 'categories' })
export class Categories {
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
    length: 1000,
    nullable: false,

  })
  description: string;

  @Column({
    type:'boolean',
    default: true,
  })
  isActive: boolean;

  // Relaciones
  @OneToMany(() => Legends, legend => legend.category)
  legends: Legends[];
}
