import { CreateDeliveryDto, DeliveryQueryDto, UpdateDeliveryDto } from '@app/deliveries';
import { Body, Controller, Delete, Get, Param, Put, Post, Query } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '@app/shared';

@ApiBearerAuth()
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
    findAll(@Query() paginationQueryDto: PaginationQueryDto, @Query() deliveryQueryDto: DeliveryQueryDto) {
        return this.deliveriesService.findAll(paginationQueryDto, deliveryQueryDto);
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
