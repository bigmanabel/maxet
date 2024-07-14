import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE } from '@app/shared';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'users-service',
        },
      },
    ]),
  ],
  controllers: [AuthController]
})
export class AuthModule { }
