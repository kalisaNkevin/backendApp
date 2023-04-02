import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Authentications')
    .setDescription(
      'The implementation of all authentication processes description',
    )
    .setContact(
      'Kevin Kalisa Support',
      'https://www.kalisangabokevin.com/#contacts',
      'kalisangabokevin@gmail.com',
    )
    .setLicense(
      'Apache 2.0',
      'https://www.apache.org/licenses/LICENSE-2.0.html',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
