import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestAppConfig } from './config/NestAppConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  NestAppConfig(app);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
