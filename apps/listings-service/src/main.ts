import { NestFactory } from '@nestjs/core';
import { ListingsServiceModule } from './listings-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const options = new DocumentBuilder()
    .setTitle('Maxet Listings Management API')
    .setDescription('Maxet Listings Management API with NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
