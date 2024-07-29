import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product: string;

    @Column()
    quantity: number;

    @ManyToOne(() => User, user => user.cart)
    user: User;
 }
