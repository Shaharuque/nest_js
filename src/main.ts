import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const port =  3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //Global error handler
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
