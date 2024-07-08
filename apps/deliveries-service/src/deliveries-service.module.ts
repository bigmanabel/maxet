import { Module } from '@nestjs/common';
import { DeliveriesServiceController } from './deliveries-service.controller';
import { DeliveriesServiceService } from './deliveries-service.service';

@Module({
  imports: [],
  controllers: [DeliveriesServiceController],
  providers: [DeliveriesServiceService],
})
export class DeliveriesServiceModule {}
