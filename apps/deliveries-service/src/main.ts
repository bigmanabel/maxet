import { NestFactory } from '@nestjs/core';
import { DeliveriesServiceModule } from './deliveries-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(DeliveriesServiceModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'deliveries-service'
      },
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
