import { Module } from '@nestjs/common';
import { ListingsServiceController } from './listings-service.controller';
import { ListingsServiceService } from './listings-service.service';

@Module({
  imports: [],
  controllers: [ListingsServiceController],
  providers: [ListingsServiceService],
})
export class ListingsServiceModule {}
