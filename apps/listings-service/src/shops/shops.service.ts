import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto, ShopQueryDto, UpdateShopDto } from '@app/listings';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { PaginationQueryDto, Status } from '@app/shared';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
  ) { }

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

  async findAll(paginationQueryDto: PaginationQueryDto, shopQueryDto: ShopQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const { name, bio, location, /*owner*/ } = shopQueryDto;

    const conditions: FindOptionsWhere<Shop> | FindOptionsWhere<Shop[]> = {
      ...(name ? { name: Like(`%${name}%`) } : {}),
      ...(bio ? { bio: Like(`%${bio}%`) } : {}),
      ...(location ? { location: Like(`%${location}%`) } : {}),
      // ...(owner ? { owner: owner } : {}),
    }

    try {
      const shops = await this.shopRepository.find({
        where: conditions,
        take: limit,
        skip: offset,
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
        image: updateShopDto.image ? updateShopDto.image : shop.image,
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

      await this.shopRepository.update(id, { status: Status.Inactive});

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

  async listings(id: string) {
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
        message: 'Shop listings retrieved successfully',
        data: shop.listings,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)
      }
      throw new BadRequestException(error.message);
    }
  }
}

