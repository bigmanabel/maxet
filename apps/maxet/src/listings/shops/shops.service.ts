import { CreateShopDto, ShopQueryDto, UpdateShopDto } from '@app/listings';
import { LISTINGS_SERVICE, PaginationQueryDto } from '@app/shared';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, of } from 'rxjs';

@Injectable()
export class ShopsService {
    constructor(
        @Inject(LISTINGS_SERVICE) private readonly client: ClientProxy,
    ) { }

    async create(createShopDto: CreateShopDto) {
        try {
            const shop = await lastValueFrom(
                this.client.send('shops.create', createShopDto)
            );
            return shop;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    async findAll(paginationQueryDto: PaginationQueryDto, shopQueryDto: ShopQueryDto) {
        try {
            const shop = await lastValueFrom(
                this.client.send('shops.findAll', { paginationQueryDto, shopQueryDto })
            );
            return shop;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            const shop = await lastValueFrom(
                this.client.send('shops.findOne', id)
            );
            return shop;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    async listings(id: string) {
        try {
            const shop = await lastValueFrom(
                this.client.send('shops.listings', id)
            );
            return shop;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    async update(id: string, updateShopDto: UpdateShopDto) {
        try {
            const shop = await lastValueFrom(
                this.client.send('shops.update', { id, ...updateShopDto })
            );
            return shop;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    async remove(id: string) {
        try {
            const shop = await lastValueFrom(
                this.client.send('shops.delete', id)
            );
            return shop;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }
}
