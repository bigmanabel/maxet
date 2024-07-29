import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateListingDto, ListingsQueryDto, UpdateListingDto } from '@app/listings';
import { PaginationQueryDto } from '@app/shared';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing) private readonly listingRepository: Repository<Listing>,
  ) { }

  async create(createListingDto: CreateListingDto) {
    try {
      const listing = this.listingRepository.create({
        ...createListingDto,
        shop: {
          id: createListingDto.shop
        },
        category: {
          id: createListingDto.category
        }
      });

      await this.listingRepository.save(listing);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Listing created successfully',
        data: listing,
      }
    } catch (error) {
      return new BadRequestException(error.message).getResponse();
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto, listingsQueryDto: ListingsQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const { name, priceMin, priceMax, description, shop } = listingsQueryDto;

    const conditions: FindOptionsWhere<Listing> | FindOptionsWhere<Listing[]> = {
      ...(name ? { name: Like(`%${name}%`) } : {}),
      ...(description ? { description: Like(`%${description}%`) } : {}),
      ...(priceMin && priceMax ? { price: Between(priceMin, priceMax) } : {}),
      ...(shop ? { shop: { name: Like(`%${shop}%`) } } : {}),
    }

    try {
      const listings = await this.listingRepository.find({
        where: conditions,
        take: limit,
        skip: offset,
        relations: ['shop']
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Listings retrieved successfully',
        data: listings
      }
    } catch (error) {
      console.log(error);
      return new BadRequestException(error.message).getResponse();
    }
  }

  async findOne(id: string) {
    try {
      const listing = await this.listingRepository.findOneBy({ id });

      if (!listing) {
        return new NotFoundException('Listing not found').getResponse();
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Listing retrieved successfully',
        data: listing,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new NotFoundException(error.message).getResponse();
      }
      return new BadRequestException(error.message).getResponse();
    }
  }

  async update(id: string, updateListingDto: UpdateListingDto) {
    try {
      const listing = await this.listingRepository.findOneBy({ id });

      if (!listing) {
        return new NotFoundException('Listing not found').getResponse();
      }

      await this.listingRepository.update(id, {
        ...updateListingDto,
        shop: {
          id: updateListingDto.shop ? updateListingDto.shop : listing.shop.id,
        },
        category: {
          id: updateListingDto.category ? updateListingDto.category : listing.category.id,
        },
        image: updateListingDto.image ? updateListingDto.image : listing.image,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Listing updated successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new NotFoundException(error.message).getResponse();
      }
      return new BadRequestException(error.message).getResponse();
    }
  }

  async remove(id: string) {
    try {
      const listing = await this.listingRepository.findOneBy({ id });

      if (!listing) {
        return new NotFoundException('Listing not found').getResponse();
      }

      await this.listingRepository.remove(listing);

      return {
        statusCode: HttpStatus.OK,
        message: 'Listing deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new NotFoundException(error.message).getResponse();
      }
      return new BadRequestException(error.message).getResponse();
    }
  }

  async search(query: string) {
    try {
      const listings = await this.listingRepository.find({
        where: [
          { name: Like(`%${query}%`) },
          { description: Like(`%${query}%`) },
        ],
        relations: ['shop'],
      });
 
      if (!listings.length) {
        return new NotFoundException('No listings found').getResponse();
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Listings retrieved successfully',
        data: listings
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new NotFoundException(error.message).getResponse();
      }
      return new BadRequestException(error.message).getResponse();
    }
  }
}
