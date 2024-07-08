import { Module } from '@nestjs/common';
import { ListingsServiceController } from './listings-service.controller';
import { ListingsServiceService } from './listings-service.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [ListingsServiceController],
  providers: [ListingsServiceService],
})
export class ListingsServiceModule {}
