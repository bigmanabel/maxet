import { CreateDeliveryDto } from '@app/deliveries';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { DELIVERIES_SERVICE } from '@app/shared/constants';
import { lastValueFrom } from 'rxjs';

@Controller('deliveries')
export class DeliveriesController {
    constructor(
        @Inject(DELIVERIES_SERVICE) private readonly client: ClientProxy,
    ) { }

    @MessagePattern('deliveries.create')
    async create(@Payload() createDeliveryDto: CreateDeliveryDto) {
        const delivery = await lastValueFrom(
            this.client.send('deliveries.create', createDeliveryDto)
        );
        return delivery;
    }

    @MessagePattern('deliveries.findAll')
    async findAll() {
        const deliveries = await lastValueFrom(
            this.client.send('deliveries.findAll', {})
        );
        return deliveries;
    }

    @MessagePattern('deliveries.findOne')
    async findOne(@Payload() id: number) {
        const delivery = await lastValueFrom(
            this.client.send('deliveries.findOne', id)
        );
        return delivery;
    }

    @MessagePattern('deliveries.update')
    async update(@Payload() updateDeliveryDto: CreateDeliveryDto) {
        const delivery = await lastValueFrom(
            this.client.send('deliveries.update', updateDeliveryDto)
        );
        return delivery;
    }

    @MessagePattern('deliveries.delete')
    async remove(@Payload() id: number) {
        const delivery = await lastValueFrom(
            this.client.send('deliveries.delete', id)
        );
        return delivery;
    }
}
