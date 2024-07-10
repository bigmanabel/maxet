import { Injectable } from '@nestjs/common';
import { CreateShopOwnerDto } from './dto/create-shop-owner.dto';
import { UpdateShopOwnerDto } from './dto/update-shop-owner.dto';

@Injectable()
export class ShopOwnersService {
  create(createShopOwnerDto: CreateShopOwnerDto) {
    return 'This action adds a new shopOwner';
  }

  findAll() {
    return `This action returns all shopOwners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopOwner`;
  }

  update(id: number, updateShopOwnerDto: UpdateShopOwnerDto) {
    return `This action updates a #${id} shopOwner`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopOwner`;
  }
}
