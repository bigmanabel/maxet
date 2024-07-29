import { CreateListingDto, ListingsQueryDto, UpdateListingDto } from '@app/listings';
import { LISTINGS_SERVICE, PaginationQueryDto } from '@app/shared';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListingsService {
    constructor(
        @Inject(LISTINGS_SERVICE) private readonly client: ClientProxy,
    ) { }

    async create(createListingDto: CreateListingDto) {
        try {
            const listing = await lastValueFrom(
                this.client.send('listings.create', createListingDto)
            );
            return listing;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    async findAll(paginationQueryDto: PaginationQueryDto, listingsQueryDto: ListingsQueryDto) {
        try {
            const listings = await lastValueFrom(
                this.client.send('listings.findAll', { paginationQueryDto, listingsQueryDto})
            );

            return listings;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async findOne(id: string) {
        try {
            const listing = await lastValueFrom(
                this.client.send('listings.findOne', id)
            );
            return listing;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async update(id: string, updateListingDto: UpdateListingDto) {
        try {
            const listing = await lastValueFrom(
                this.client.send('listings.update', { id, ...updateListingDto })
            );
            return listing;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async remove(id: string) {
        try {
            const listing = await lastValueFrom(
                this.client.send('listings.delete', id)
            );
            return listing;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async search(query: string) {
        try {
            const listings = await lastValueFrom(
                this.client.send('listings.search', query)
            );
            
            return listings;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }
}
