import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CustomersModule } from './customers/customers.module';
import { ShopOwnersModule } from './shop-owners/shop-owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CustomersModule, ShopOwnersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
