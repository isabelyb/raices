import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity('legends')
export class Legends{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    title: string

    @Column({
        type: 'varchar',
        length: 350,
        nullable: false
    })
    description: string

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false
    })
    imageUrl: string;

    @Column({
        type: 'varchar',
        length: 100000000,
        nullable: false
    })
    story: string;

    @Column({
        type: 'varchar',
        length: 60,
        nullable: false
    })
    origin: string;

    @Column({
        type: 'boolean',
        default: true
    })
    isActivate: boolean;

    @Column({
    type: 'timestamp',
    nullable: false,
    })
    createdAt: Date;


    
    

}