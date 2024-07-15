import { CreateOrderDto } from '@app/orders';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '@app/shared/constants/constants';
import { lastValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(ORDERS_SERVICE) private readonly client: ClientProxy,
    ) { }

    @MessagePattern('orders.create')
    async create(@Payload() createOrderDto: CreateOrderDto) {
        const order = await lastValueFrom(
            this.client.send('orders.create', createOrderDto)
        );
        return order;
    }

    @MessagePattern('orders.findAll')
    async findAll() {
        const orders = await lastValueFrom(
            this.client.send('orders.findAll', {})
        );
        return orders;
    }

    @MessagePattern('orders.findOne')
    async findOne(@Payload() id: number) {
        const order = await lastValueFrom(
            this.client.send('orders.findOne', id)
        );
        return order;
    }

    @MessagePattern('orders.update')
    async update(@Payload() updateOrderDto: CreateOrderDto) {
        const order = await lastValueFrom(
            this.client.send('orders.update', updateOrderDto)
        );
        return order;
    }

    @MessagePattern('orders.delete')
    async remove(@Payload() id: number) {
        const order = await lastValueFrom(
            this.client.send('orders.delete', id)
        );
        return order;
    }
}


