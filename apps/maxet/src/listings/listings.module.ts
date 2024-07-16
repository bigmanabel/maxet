import { Module } from '@nestjs/common';
import { ListingsController } from './listings.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LISTINGS_SERVICE } from '@app/shared';
import { ListingsService } from './listings.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: LISTINGS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'listings-service'
        }
      },
    ])
  ],
  controllers: [ListingsController],
  providers: [ListingsService]
})
export class ListingsModule { }
