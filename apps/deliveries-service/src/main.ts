import { NestFactory } from '@nestjs/core';
import { DeliveriesServiceModule } from './deliveries-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DeliveriesServiceModule);
  await app.listen(3000);
}
bootstrap();
