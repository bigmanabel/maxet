import { NestFactory } from '@nestjs/core';
import { OrdersServiceModule } from './orders-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const options = new DocumentBuilder()
    .setTitle('Maxet Orders API')
    .setDescription('Maxet Order Management API with NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3003);
}
bootstrap();
