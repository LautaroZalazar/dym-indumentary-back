import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config';
import { corsOptions } from './config/cors';
import express = require('express');

const server = express();
let appReady: Promise<express.Express> | null = null;

async function bootstrap(): Promise<express.Express> {
  console.log('[bootstrap] start');
  console.log('[bootstrap] MONGO_URI set?', !!process.env.MONGO_URI);
  console.log('[bootstrap] APP_GLOBAL_PREFIX:', process.env.APP_GLOBAL_PREFIX);

  const t0 = Date.now();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: ['error', 'warn', 'log'],
  });
  console.log('[bootstrap] NestFactory.create done in', Date.now() - t0, 'ms');

  app.enableCors(corsOptions);
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));
  app.useGlobalPipes(new ValidationPipe());
  if (process.env.APP_GLOBAL_PREFIX) {
    app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX);
  }

  if (process.env.NODE_ENV !== 'production') {
    const documentationConfig = new DocumentBuilder()
      .setTitle('Mercado Pago')
      .setDescription('')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, documentationConfig);
    SwaggerModule.setup('api/documentation', app, document);
  }

  const t1 = Date.now();
  await app.init();
  console.log('[bootstrap] app.init done in', Date.now() - t1, 'ms');
  console.log('[bootstrap] total', Date.now() - t0, 'ms');
  return server;
}

function getApp() {
  if (!appReady) {
    appReady = bootstrap().catch((err) => {
      console.error('[bootstrap] FAILED:', err);
      appReady = null;
      throw err;
    });
  }
  return appReady;
}

export default async function handler(req: express.Request, res: express.Response) {
  try {
    const app = await getApp();
    app(req, res);
  } catch (err) {
    console.error('[handler] bootstrap failed:', err);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Bootstrap failed',
        message: err?.message || String(err),
      });
    }
  }
}

if (!process.env.VERCEL) {
  getApp()
    .then(() => {
      const port = config().app.app_port || 3000;
      server.listen(port, () => {
        console.log(
          'Listening on: http://localhost:' + port + '/' + config().app.app_global_prefix,
        );
        console.log('Server started successfully 🎸 ');
      });
    })
    .catch((e) => {
      console.log('Server failed to start');
      console.log(e);
    });
}
