import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('deliveries')
export class Delivery { 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    order: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
