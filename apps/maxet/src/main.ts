import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.use('/api/users', createProxyMiddleware({
    target: process.env.USERS_SERVICE_URL,
    changeOrigin: true,
  }));

  await app.listen(8000);
}
bootstrap();
