import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['asdf'] //this is a secret key
  }));
  app.useGlobalPipes(new ValidationPipe(
    {whitelist:true} //this will remove any properties that are not defined in the DTO
  ));
  await app.listen(3000);
}
bootstrap();
