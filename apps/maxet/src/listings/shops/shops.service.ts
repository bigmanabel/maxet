import { CreateShopDto, UpdateShopDto } from '@app/listings';
import { LISTINGS_SERVICE } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ShopsService {
    constructor(
        @Inject(LISTINGS_SERVICE) private readonly client: ClientProxy,
    ) { }

    async create(createShopDto: CreateShopDto) {
        const shop = await lastValueFrom(
            this.client.send('shops.create', createShopDto)
        );
        return shop;
    }

    async findAll() {
        const shop = await lastValueFrom(
            this.client.send('shops.findAll', {})
        );
        return shop;
    }

    async findOne(id: string) {
        const shop = await lastValueFrom(
            this.client.send('shops.findOne', id)
        );
        return shop;
    }

    async update(id: string, updateShopDto: UpdateShopDto) {
        const shop = await lastValueFrom(
            this.client.send('shops.update', { id, ...updateShopDto })
        );
        return shop;
    }

    async remove(id: string) {
        const shop = await lastValueFrom(
            this.client.send('shops.delete', id)
        );
        return shop;
    }
}
