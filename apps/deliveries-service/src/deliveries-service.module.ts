import { Module } from '@nestjs/common';
import { DeliveriesServiceController } from './deliveries-service.controller';
import { DeliveriesServiceService } from './deliveries-service.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [DeliveriesServiceController],
  providers: [DeliveriesServiceService],
})
export class DeliveriesServiceModule {}
