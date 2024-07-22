import { Controller } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from '@app/listings';
import { UpdateListingDto } from '@app/listings';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Auth, AuthType } from '@app/iam';

@ApiTags('listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }

  @MessagePattern('listings.create')
  create(@Payload() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @MessagePattern('listings.findAll')
  findAll() {
    return this.listingsService.findAll();
  }

  @MessagePattern('listings.findOne')
  findOne(@Payload('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @MessagePattern('listings.update')
  update(@Payload('id') id: string, @Payload() updateListingDto: UpdateListingDto) {
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
