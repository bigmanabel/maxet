import { NestFactory } from '@nestjs/core';
import { OrdersServiceModule } from './orders-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrdersServiceModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'orders-service'
      },
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();

  await app.listen(3003);
}
bootstrap();
