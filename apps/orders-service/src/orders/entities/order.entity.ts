import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('simple-array')
    listings: string[];

    @Column('decimal', { scale: 2, precision: 9 })
    totalAmount: number;

    @Column('timestamp')
    deliveryDate: Date;

    @Column()
    deliveryAddress: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
 }
