import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'https://dym-indumentary-front-3ba7ddh8p-lautarozalazars-projects.vercel.app/',
    'http://localhost:3000',
    'http://localhost:5173',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET, POST, OPTIONS, PUT, DELETE',
  });
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX);
  const documentationConfig = new DocumentBuilder()
    .setTitle('Mercado Pago')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentationConfig);
  SwaggerModule.setup('api/documentation', app, document);
  await app.listen(config().app.app_port || 3000);
}
bootstrap()
  .then(() => {
    console.log(
      'Listening on: http://localhost:' +
      config().app.app_port +
      '/' +
      config().app.app_global_prefix,
    );
    console.log('Server started successfully 🎸 ');
  })
  .catch((e) => {
    console.log('Server failed to start');
    console.log(e);
  });
