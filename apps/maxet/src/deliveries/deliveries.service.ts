import { CreateDeliveryDto, UpdateDeliveryDto } from '@app/deliveries';
import { DELIVERIES_SERVICE } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DeliveriesService {
    constructor(
        @Inject(DELIVERIES_SERVICE) private readonly client: ClientProxy,
    ) {}

    async create(createDeliveryDto: CreateDeliveryDto) {
        const delivery = await lastValueFrom(
            this.client.send('deliveries.create', createDeliveryDto)
        );
        return delivery;
    }

    async findAll() {
        const deliveries = await lastValueFrom(
            this.client.send('deliveries.findAll', {})
        );
        return deliveries;
    }

    async findOne(id: string) {
        const delivery = await lastValueFrom(
            this.client.send('deliveries.findOne', id)
        );
        return delivery;
    }

    async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
        const delivery = await lastValueFrom(
            this.client.send('deliveries.update', { id, ...updateDeliveryDto })
        );
        return delivery;
    }

    async remove(id: string) {
        const delivery = await lastValueFrom(
            this.client.send('deliveries.delete', id)
        );
        return delivery;
    }
}
