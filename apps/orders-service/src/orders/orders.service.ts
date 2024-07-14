import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../../../../libs/orders/src/dto/create-order.dto';
import { UpdateOrderDto } from '../../../../libs/orders/src/dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
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

  async findAll() {
    try {
      const orders = await this.orderRepository.find();

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
