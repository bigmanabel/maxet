import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from "../../listings/entities/listing.entity";

@Entity('categories')
export class Category { 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Listing, listing => listing.category)
    listings: Listing[];
}
