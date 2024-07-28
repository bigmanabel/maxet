import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Listing } from "../../listings/entities/listing.entity";
import { Status } from "@app/shared";

@Entity('shops')
export class Shop {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    bio: string;

    @Column()
    location: string;

    @Column()
    owner: string;

    @Column()
    image: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Listing, listing => listing.shop)
    listings: Listing[];
 }
