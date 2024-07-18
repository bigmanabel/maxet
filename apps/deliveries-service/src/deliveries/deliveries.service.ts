import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from '../../../../libs/deliveries/src/dto/create-delivery.dto';
import { UpdateDeliveryDto } from '../../../../libs/deliveries/src/dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery) private readonly deliveryRepository: Repository<Delivery>,
  ) { }

  async create(createDeliveryDto: CreateDeliveryDto) {
    try {
      const delivery = this.deliveryRepository.create({
        ...createDeliveryDto,
      });

      await this.deliveryRepository.save(delivery);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delivery created successfully',
        data: delivery,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const deliveries = await this.deliveryRepository.find();

      return {
        statusCode: HttpStatus.OK,
        message: 'Deliveries retrieved successfully',
        data: deliveries,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const delivery = await this.deliveryRepository.findOneBy({ id });

      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Delivery retrieved successfully',
        data: delivery,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    try {
      const delivery = await this.deliveryRepository.findOneBy({ id });

      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }

      await this.deliveryRepository.update(id, updateDeliveryDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delivery updated successfully',
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
      const delivery = await this.deliveryRepository.findOneBy({ id });

      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }

      await this.deliveryRepository.remove(delivery);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delivery deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async info(id: string) {
    try {
      const delivery = await this.deliveryRepository.findOneBy({ order: id });

      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Delivery retrieved successfully',
        data: delivery,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
