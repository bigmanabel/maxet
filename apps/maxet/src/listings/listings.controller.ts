import { CreateListingDto } from '@app/listings';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { LISTINGS_SERVICE } from '@app/shared/constants/constants';
import { lastValueFrom } from 'rxjs';

@Controller('listings')
export class ListingsController {
    constructor(
        @Inject(LISTINGS_SERVICE) private readonly client: ClientProxy,
    ) { }

    @MessagePattern('listings.create')
    async create(@Payload() createListingDto: CreateListingDto) {
        const listing = await lastValueFrom(
            this.client.send('listings.create', createListingDto)
        );
        return listing;
    }

    @MessagePattern('listings.findAll')
    async findAll() {
        const listings = await lastValueFrom(
            this.client.send('listings.findAll', {})
        );
        return listings;
    }

    @MessagePattern('listings.findOne')
    async findOne(@Payload() id: number) {
        const listing = await lastValueFrom(
            this.client.send('listings.findOne', id)
        );
        return listing;
    }

    @MessagePattern('listings.update')
    async update(@Payload() updateListingDto: CreateListingDto) {
        const listing = await lastValueFrom(
            this.client.send('listings.update', updateListingDto)
        );
        return listing;
    }

    @MessagePattern('listings.delete')
    async remove(@Payload() id: number) {
        const listing = await lastValueFrom(
            this.client.send('listings.delete', id)
        );
        return listing;
    }
}
