// PLANTILLA DE ENTITY
// Esta es una plantilla de ejemplo para crear entidades TypeORM

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nombre_tabla')
export class ExampleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

