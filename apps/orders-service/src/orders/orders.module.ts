import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
    ]),
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
