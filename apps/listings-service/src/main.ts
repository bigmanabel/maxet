import { NestFactory } from '@nestjs/core';
import { ListingsServiceModule } from './listings-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ListingsServiceModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'listings-service'
      },
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();

  await app.listen(3002);
}
bootstrap();
