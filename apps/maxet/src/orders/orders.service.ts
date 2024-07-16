import { CreateOrderDto, UpdateOrderDto } from '@app/orders';
import { ORDERS_SERVICE } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(
        @Inject(ORDERS_SERVICE) private readonly client: ClientProxy,
    ) {}

    async create(createOrderDto: CreateOrderDto) {
        const order = await lastValueFrom(
            this.client.send('orders.create', createOrderDto)
        );
        return order;
    }

    async findAll() {
        const orders = await lastValueFrom(
            this.client.send('orders.findAll', {})
        );
        return orders;
    }

    async findOne(id: string) {
        const order = await lastValueFrom(
            this.client.send('orders.findOne', id)
        );
        return order;
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const order = await lastValueFrom(
            this.client.send('orders.update', { id, ...updateOrderDto })
        );
        return order;
    }

    async remove(id: string) {
        const order = await lastValueFrom(
            this.client.send('orders.delete', id)
        );
        return order;
    }
}
