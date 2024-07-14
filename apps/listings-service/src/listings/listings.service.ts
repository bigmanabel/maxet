import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from '../../../../libs/listings/src/dto/create-listing.dto';
import { UpdateListingDto } from '../../../../libs/listings/src/dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';

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
        }
      });

      await this.listingRepository.save(listing);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Listing created successfully',
        data: listing,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const listings = await this.listingRepository.find({
        relations: ['shop']
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Listings retrieved successfully',
        data: listings
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const listing = await this.listingRepository.findOneBy({ id });

      if (!listing) {
        throw new NotFoundException('Listing not found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Listing retrieved successfully',
        data: listing,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateListingDto: UpdateListingDto) {
    try {
      const listing = await this.listingRepository.findOneBy({ id });

      if (!listing) {
        throw new NotFoundException('Listing not found');
      }

      await this.listingRepository.update(id, {
        ...updateListingDto,
        shop: {
          id: updateListingDto.shop,
        }
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Listing updated successfully',
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
      const listing = await this.listingRepository.findOneBy({ id });

      if (!listing) {
        throw new NotFoundException('Listing not found');
      }

      await this.listingRepository.remove(listing);

      return {
        statusCode: HttpStatus.OK,
        message: 'Listing deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
