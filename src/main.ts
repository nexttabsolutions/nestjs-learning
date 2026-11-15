import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //==============SWAGGER SETUP ================
  const config = new DocumentBuilder()
    .setTitle('NEST JS TUTORIAL')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth() /**Ensures a bearer token is need for the apis */
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api' /**path to get the swagger docs */, app, document);
  // ============ ########### ================

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
