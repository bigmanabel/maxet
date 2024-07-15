import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopOwnersService } from './shop-owners.service';
import { CreateShopOwnerDto } from '../../../../../libs/users/src/dto/create-shop-owner.dto';
import { UpdateShopOwnerDto } from '../../../../../libs/users/src/dto/update-shop-owner.dto';

@Controller('shop-owners')
export class ShopOwnersController {
  constructor(private readonly shopOwnersService: ShopOwnersService) { }

  @Get()
  findAll() {
    return this.shopOwnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopOwnersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopOwnerDto: UpdateShopOwnerDto) {
    return this.shopOwnersService.update(id, updateShopOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopOwnersService.remove(id);
  }
}
