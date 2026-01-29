import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useStaticAssets(join(process.cwd(), 'uploads'));
  await app.listen(process.env.API_PORT || 4000);
}

bootstrap();
