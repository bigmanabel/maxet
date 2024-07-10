import { Module } from '@nestjs/common';
import { ShopOwnersService } from './shop-owners.service';
import { ShopOwnersController } from './shop-owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOwner } from './entities/shop-owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopOwner])],
  controllers: [ShopOwnersController],
  providers: [ShopOwnersService],
})
export class ShopOwnersModule {}
