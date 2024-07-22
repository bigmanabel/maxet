import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderQueryDto, UpdateOrderDto } from '@app/orders';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { DELIVERIES_SERVICE, PaginationQueryDto } from '@app/shared';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDeliveryDto } from '@app/deliveries';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @Inject(DELIVERIES_SERVICE) private readonly client: ClientProxy,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = this.orderRepository.create({
        ...createOrderDto,
      });

      await this.orderRepository.save(order);

      return {
        statusCode: HttpStatus.OK,
        message: 'Order created successfully',
        data: order,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto, orderQueryDto: OrderQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const { totalAmountMin, totalAmountMax, deliveryDate, deliveryAddress } = orderQueryDto;

    const conditions: FindOptionsWhere<Order> | FindOptionsWhere<Order[]> = {
      ...(totalAmountMin && totalAmountMax ? { totalAmount: Between(totalAmountMin, totalAmountMax) } : {}),
      ...(deliveryDate ? { deliveryDate: deliveryDate } : {}),
      ...(deliveryAddress ? { deliveryAddress: deliveryAddress } : {}),
    }

    try {
      const orders = await this.orderRepository.find({
        where: conditions,
        take: limit,
        skip: offset,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Orders retrieved successfully',
        data: orders,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Order retrieved successfully',
        data: order,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      await this.orderRepository.update(id, updateOrderDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Order updated successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async deliveries(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      const deliveries = this.client.send('deliveries.info', id)

      return {
        statusCode: HttpStatus.OK,
        message: 'Order deliveries retrieved successfully',
        data: deliveries['data'],
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      await this.orderRepository.remove(order);

      return {
        statusCode: HttpStatus.OK,
        message: 'Order deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
