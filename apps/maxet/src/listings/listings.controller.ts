import { CreateListingDto, ListingsQueryDto, UpdateListingDto } from '@app/listings';
import { Body, Controller, Delete, Get, Param, Put, Post, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, AuthType } from '@app/iam';
import { PaginationQueryDto } from '@app/shared';

@ApiBearerAuth()
@ApiTags('listings')
@Controller('listings')
export class ListingsController {
    constructor(
        private readonly listingsService: ListingsService
    ) { }

    @Post()
    create(@Body() createListingDto: CreateListingDto) {
        return this.listingsService.create(createListingDto);
    }

    @Get()
    findAll(@Query() paginationQueryDto: PaginationQueryDto, @Query() listingsQueryDto: ListingsQueryDto) {
        return this.listingsService.findAll(paginationQueryDto, listingsQueryDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.listingsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
        return this.listingsService.update(id, updateListingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.listingsService.remove(id);
    }

    @Auth(AuthType.None)
    @Get('search')
    search(@Query('query') query: string) {
        return this.listingsService.search(query);
    }
}
