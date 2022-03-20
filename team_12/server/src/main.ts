import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  const configService: ConfigService<Environment> = app.get(ConfigService);
  await app.listen(configService.get('PORT')!);
}
bootstrap();
