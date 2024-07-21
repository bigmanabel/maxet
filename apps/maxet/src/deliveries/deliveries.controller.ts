import { CreateDeliveryDto, UpdateDeliveryDto } from '@app/deliveries';
import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('deliveries')
@Controller('deliveries')
export class DeliveriesController {
    constructor(
        private readonly deliveriesService: DeliveriesService
    ) { }

    @Post()
    create(@Body() createDeliveryDto: CreateDeliveryDto) {
        return this.deliveriesService.create(createDeliveryDto);
    }

    @Get()
    findAll() {
        return this.deliveriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.deliveriesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
        return this.deliveriesService.update(id, updateDeliveryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deliveriesService.remove(id);
    }
}
