import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CustomersModule } from './customers/customers.module';
import { ShopOwnersModule } from './shop-owners/shop-owners.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '@app/shared';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'orders-service'
        }
      },
    ]),
    TypeOrmModule.forFeature([User]),
    CustomersModule,
    ShopOwnersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
