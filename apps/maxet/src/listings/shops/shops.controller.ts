import { Body, Controller, Delete, Get, Param, Put, Post, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto, ShopQueryDto, UpdateShopDto } from '@app/listings';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '@app/shared';

@ApiBearerAuth()
@ApiTags('shops')
@Controller('shops')
export class ShopsController {
    constructor(
        private readonly shopService: ShopsService
    ) { }

    @Post()
    create(@Body() createShopDto: CreateShopDto) {
        return this.shopService.create(createShopDto);
    }

    @Get()
    findAll(@Query() paginationQueryDto: PaginationQueryDto, @Query() shopQueryDto: ShopQueryDto) {
        return this.shopService.findAll(paginationQueryDto, shopQueryDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.shopService.findOne(id);
    }

    @Get(':id/listings')
    listings(@Param('id') id: string) {
        return this.shopService.listings(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
        return this.shopService.update(id, updateShopDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.shopService.remove(id);
    }
}
