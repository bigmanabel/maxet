import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Shop } from "../../shops/entities/shop.entity";

@Entity('listings')
export class Listing { 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 9, scale: 2, default: 0.00 })
    price: number;

    @Column()
    stockQuantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Shop, shop => shop.listings)
    shop: Shop;
}
