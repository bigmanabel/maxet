import { CreateDeliveryDto, DeliveryQueryDto, UpdateDeliveryDto } from '@app/deliveries';
import { DELIVERIES_SERVICE, PaginationQueryDto } from '@app/shared';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DeliveriesService {
    constructor(
        @Inject(DELIVERIES_SERVICE) private readonly client: ClientProxy,
    ) { }

    async create(createDeliveryDto: CreateDeliveryDto) {
        try {
            const delivery = await lastValueFrom(
                this.client.send('deliveries.create', createDeliveryDto)
            );
            return delivery;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async findAll(paginationQueryDto: PaginationQueryDto, deliveryQueryDto: DeliveryQueryDto) {
        try {
            const deliveries = await lastValueFrom(
                this.client.send('deliveries.findAll', { paginationQueryDto, deliveryQueryDto })
            );
            return deliveries;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async findOne(id: string) {
        try {
            const delivery = await lastValueFrom(
                this.client.send('deliveries.findOne', id)
            );
            return delivery;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
        try {
            const delivery = await lastValueFrom(
                this.client.send('deliveries.update', { id, ...updateDeliveryDto })
            );
            return delivery;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async remove(id: string) {
        try {
            const delivery = await lastValueFrom(
                this.client.send('deliveries.delete', id)
            );
            return delivery;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }
}
