import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LISTINGS_SERVICE } from '@app/shared';

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
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
