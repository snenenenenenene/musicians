import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../docs/musicians.json'
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  
  await app.listen(process.env.PORT);
}
bootstrap();



















