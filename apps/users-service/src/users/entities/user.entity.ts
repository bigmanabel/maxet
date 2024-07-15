import { Role } from "@app/users";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customers/entities/customer.entity";
import { ShopOwner } from "../shop-owners/entities/shop-owner.entity";
import { Status } from "@app/shared";


@Entity('users')
export class User { 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({nullable: true})
    password: string;

    @Column('enum', { enum: Role })
    role: Role;

    @Column({ default: false })
    isTfaEnabled: boolean;

    @Column({ nullable: true })
    tfaSecret: string;

    @Column({ nullable: true })
    googleId: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @OneToOne(() => Customer, customer => customer.user)
    @JoinColumn()
    customer?: Customer;

    @OneToOne(() => ShopOwner, shopOwner => shopOwner.user)
    @JoinColumn()
    shopOwner?: ShopOwner;
}
