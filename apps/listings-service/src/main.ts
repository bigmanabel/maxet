import { NestFactory } from '@nestjs/core';
import { ListingsServiceModule } from './listings-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ListingsServiceModule);
  await app.listen(3002);
}
bootstrap();
