import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ListingsModule } from './listings/listings.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard, AuthenticationGuard, RolesGuard } from '@app/iam';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@app/iam/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UsersModule,
    ListingsModule,
    OrdersModule,
    DeliveriesModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    CartModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    AppService
  ],
})
export class AppModule { }
