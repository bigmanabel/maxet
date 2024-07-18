import { NestFactory } from '@nestjs/core';
import { UsersServiceModule } from './users-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(UsersServiceModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'users-service',
        queueOptions: {
          durable: true,
        },
      },
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();

  const options = new DocumentBuilder()
    .setTitle('Maxet Authx API')
    .setDescription('Maxet Authentication and Authorization API with NestJS')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3004);
}
bootstrap();
