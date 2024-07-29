import { Body, Controller, Delete, Get, Param, Put, Post, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto, ShopQueryDto, UpdateShopDto } from '@app/listings';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '@app/shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth, AuthType } from '@app/iam';

@ApiBearerAuth()
@ApiTags('shops')
@Controller('shops')
export class ShopsController {
    constructor(
        private readonly shopService: ShopsService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() createShopDto: CreateShopDto, @UploadedFile() file: Express.Multer.File) {
        createShopDto.image = file?.buffer.toString('base64');
        return this.shopService.create(createShopDto);
    }

    @Auth(AuthType.None)
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
    @UseInterceptors(FileInterceptor('file'))
    update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto, @UploadedFile() file: Express.Multer.File) {
        updateShopDto.image = file?.buffer.toString('base64');
        return this.shopService.update(id, updateShopDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.shopService.remove(id);
    }
}
