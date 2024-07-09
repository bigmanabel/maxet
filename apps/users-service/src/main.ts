import { NestFactory } from '@nestjs/core';
import { UsersServiceModule } from './users-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UsersServiceModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'users-service'
      },
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();

  await app.listen(3004);
}
bootstrap();
