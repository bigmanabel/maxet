import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Shop } from '../shops/entities/shop.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Shop, Category])],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
