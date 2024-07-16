import { CreateListingDto } from '@app/listings';
import { LISTINGS_SERVICE } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListingsService {
    constructor(
        @Inject(LISTINGS_SERVICE) private readonly client: ClientProxy,
    ) { }

    async create(createListingDto: CreateListingDto) {
        const listing = await lastValueFrom(
            this.client.send('listings.create', createListingDto)
        );
        return listing;
    }

    async findAll() {
        const listings = await lastValueFrom(
            this.client.send('listings.findAll', {})
        );
        return listings;
    }

    async findOne(id: string) {
        const listing = await lastValueFrom(
            this.client.send('listings.findOne', id)
        );
        return listing;
    }

    async update(id: string, updateListingDto: CreateListingDto) {
        const listing = await lastValueFrom(
            this.client.send('listings.update', { id, ...updateListingDto })
        );
        return listing;
    }

    async remove(id: string) {
        const listing = await lastValueFrom(
            this.client.send('listings.delete', id)
        );
        return listing;
    }
}
