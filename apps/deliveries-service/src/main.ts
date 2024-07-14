import { NestFactory } from '@nestjs/core';
import { DeliveriesServiceModule } from './deliveries-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const options = new DocumentBuilder()
    .setTitle('Maxet Delivery Management API')
    .setDescription('Maxet Delivery Managmement API with NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
