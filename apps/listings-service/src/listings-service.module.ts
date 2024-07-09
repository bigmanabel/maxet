import { Module } from '@nestjs/common';
import { ListingsServiceController } from './listings-service.controller';
import { ListingsServiceService } from './listings-service.service';
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
  controllers: [ListingsServiceController],
  providers: [ListingsServiceService],
})
export class ListingsServiceModule {}
