import { PartialType } from '@nestjs/swagger';
import { CreateShopOwnerDto } from './create-shop-owner.dto';

export class UpdateShopOwnerDto extends PartialType(CreateShopOwnerDto) {}
