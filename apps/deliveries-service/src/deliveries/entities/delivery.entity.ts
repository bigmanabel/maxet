import { DeliveryStatus } from "@app/shared";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('deliveries')
export class Delivery {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    order: string;

    @Column({ default: 'MaxQargo' })
    carrier: string;

    @Column()
    estimatedDeliveryDate: Date;

    @Column('enum', { enum: DeliveryStatus, default: DeliveryStatus.Pending })
    status: DeliveryStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
