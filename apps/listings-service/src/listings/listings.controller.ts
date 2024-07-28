import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto, ListingsQueryDto } from '@app/listings';
import { UpdateListingDto } from '@app/listings';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationQueryDto } from '@app/shared';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }

  @MessagePattern('listings.create')
  @UseInterceptors(FileInterceptor('file'))
  create(@Payload() createListingDto: CreateListingDto, @UploadedFile() file: Express.Multer.File) {
    createListingDto.image = file?.buffer.toString('base64');
    return this.listingsService.create(createListingDto);
  }

  @MessagePattern('listings.findAll')
  findAll(@Payload() paginationQueryDto: PaginationQueryDto, @Payload() listingsQueryDto: ListingsQueryDto) {
    return this.listingsService.findAll(paginationQueryDto, listingsQueryDto);
  }

  @MessagePattern('listings.findOne')
  findOne(@Payload('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @MessagePattern('listings.update')
  @UseInterceptors(FileInterceptor('file'))
  update(@Payload('id') id: string, @Payload() updateListingDto: UpdateListingDto, @UploadedFile() file: Express.Multer.File) {
    updateListingDto.image = file?.buffer.toString('base64');
    return this.listingsService.update(id, updateListingDto);
  }

  @MessagePattern('listings.delete')
  remove(@Payload('id') id: string) {
    return this.listingsService.remove(id);
  }

  @MessagePattern('listings.search')
  search(@Payload('query') query: string) {
    return this.listingsService.search(query);
  }
}
