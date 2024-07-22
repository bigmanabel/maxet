import { Controller } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto, UpdateShopDto } from '@app/listings';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }

  @MessagePattern('shops.create')
  create(@Payload() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @MessagePattern('shops.findAll')
  findAll() {
    return this.shopsService.findAll();
  }

  @MessagePattern('shops.findOne')
  findOne(@Payload('id') id: string) {
    return this.shopsService.findOne(id);
  }

  @MessagePattern('shops.update')
  update(@Payload('id') id: string, @Payload() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  @MessagePattern('shops.delete')
  remove(@Payload('id') id: string) {
    return this.shopsService.remove(id);
  }

  @MessagePattern('shops.listings')
  listings(@Payload('id') id: string) {
    return this.shopsService.listings(id);
  }
}
