import { Module } from '@nestjs/common';
import { DeliveriesServiceController } from './deliveries-service.controller';
import { DeliveriesServiceService } from './deliveries-service.service';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    HealthModule
  ],
  controllers: [DeliveriesServiceController],
  providers: [DeliveriesServiceService],
})
export class DeliveriesServiceModule { }
