import { CreateListingDto } from '@app/listings';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ApiTags } from '@nestjs/swagger';

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
    findAll() {
        return this.listingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.listingsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateListingDto: CreateListingDto) {
        return this.listingsService.update(id, updateListingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.listingsService.remove(id);
    }
}
