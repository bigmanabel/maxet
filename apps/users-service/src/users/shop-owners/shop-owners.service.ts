import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateShopOwnerDto } from './dto/update-shop-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopOwner } from './entities/shop-owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopOwnersService {
  constructor(
    @InjectRepository(ShopOwner) private readonly shopOwnerRepository: Repository<ShopOwner>,
  ) { }

  async findAll() {
    try {
      const shopOwners = await this.shopOwnerRepository.find();

      return {
        statusCode: HttpStatus.OK,
        message: 'Shop Owners retrieved successfully',
        data: shopOwners,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const shopOwner = await this.shopOwnerRepository.findOneBy({ id });

      if (!shopOwner) {
        throw new NotFoundException('Shop Owner not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Shop Owner retrieved successfully',
        data: shopOwner,
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateShopOwnerDto: UpdateShopOwnerDto) {
    try {
      const shopOwner = await this.shopOwnerRepository.findOneBy({ id });

      if (!shopOwner) {
        throw new NotFoundException('Shop Owner not found');
      }

      await this.shopOwnerRepository.update(id, updateShopOwnerDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Shop Owner updated successfully',
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
      const shopOwner = await this.shopOwnerRepository.findOneBy({ id });

      if (!shopOwner) {
        throw new NotFoundException('Shop Owner not found');
      }

      await this.shopOwnerRepository.remove(shopOwner);

      return {
        statusCode: HttpStatus.OK,
        message: 'Shop Owner deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
