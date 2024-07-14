import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { DELIVERIES_SERVICE } from '@app/shared';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: DELIVERIES_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'deliveries-service'
        }
      },
    ])
  ],
  controllers: [DeliveriesController]
})
export class DeliveriesModule { }
