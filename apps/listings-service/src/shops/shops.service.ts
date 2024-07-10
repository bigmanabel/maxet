import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
  ) {}

  async create(createShopDto: CreateShopDto) {
    try {
      const shop = this.shopRepository.create({
        ...createShopDto
      });

      await this.shopRepository.save(shop);

      return {
        statusCode: HttpStatus.OK,
        message: 'Shop created successfully',
        data: shop,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const shops = await this.shopRepository.find({
        relations: ['listings'],
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Shops retrieved successfully',
        data: shops,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const shop = await this.shopRepository.findOne({
        where: {
          id
        },
        relations: ['listings'],
      });

      if (!shop) {
        throw new NotFoundException('Shop not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Shop retrieved successfully',
        data: shop,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateShopDto: UpdateShopDto) {
    try {
      const shop = await this.shopRepository.findOneBy({ id });

      if (!shop) {
        throw new NotFoundException('Shop not found');
      }

      await this.shopRepository.update(id, {
        ...updateShopDto,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Shop updated successfully'
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const shop = await this.shopRepository.findOneBy({ id });
      
      if (!shop) {
        throw new NotFoundException('Shop not found');
      }

      await this.shopRepository.remove(shop);

      return {
        statusCode: HttpStatus.OK,
        message: 'Shop deleted successfully'
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)
      }
      throw new BadRequestException(error.message);
    }
  }
}
