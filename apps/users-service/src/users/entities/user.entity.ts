import { Role } from "@app/users";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "@app/shared";
import { Cart } from "../../cart/entities/cart.entity";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column('enum', { enum: Role })
    role: Role;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ default: false })
    isTfaEnabled: boolean;

    @Column({ nullable: true })
    tfaSecret: string;

    @Column({ nullable: true })
    googleId: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @OneToMany(() => Cart, cart => cart.user)
    cart: Cart[];
}
