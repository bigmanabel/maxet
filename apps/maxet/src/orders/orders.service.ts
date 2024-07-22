import { CreateOrderDto, OrderQueryDto, UpdateOrderDto } from '@app/orders';
import { ORDERS_SERVICE, PaginationQueryDto } from '@app/shared';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(
        @Inject(ORDERS_SERVICE) private readonly client: ClientProxy,
    ) { }

    async create(createOrderDto: CreateOrderDto) {
        try {
            const order = await lastValueFrom(
                this.client.send('orders.create', createOrderDto)
            );
            return order;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async findAll(paginationQueryDto: PaginationQueryDto, orderQueryDto: OrderQueryDto) {
        try {
            const orders = await lastValueFrom(
                this.client.send('orders.findAll', { paginationQueryDto, orderQueryDto })
            );
            return orders;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async findOne(id: string) {
        try {
            const order = await lastValueFrom(
                this.client.send('orders.findOne', id)
            );
            return order;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        try {
            const order = await lastValueFrom(
                this.client.send('orders.update', { id, ...updateOrderDto })
            );
            return order;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async remove(id: string) {
        try {
            const order = await lastValueFrom(
                this.client.send('orders.delete', id)
            );
            return order;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async deliveries(id: string) {
        try {
            const deliveries = await lastValueFrom(
                this.client.send('orders.deliveries', id)
            );
            return deliveries;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }
}
