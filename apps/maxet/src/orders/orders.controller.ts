import { CreateOrderDto, OrderQueryDto, UpdateOrderDto } from '@app/orders';
import { Body, Controller, Delete, Get, Inject, Param, Put, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '@app/shared';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService,
    ) { }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Get()
    findAll(@Query() paginationQueryDto: PaginationQueryDto, @Query() orderQueryDto: OrderQueryDto) {
        return this.orderService.findAll(paginationQueryDto, orderQueryDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }

    @Get(':id/deliveries')
    deliveries(@Param('id') id: string) {
        return this.orderService.deliveries(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }
}


