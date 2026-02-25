import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { mkdirSync } from 'fs';
import { join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import { existsSync } from 'fs';
import { AppModule } from './app.module';

const API_PREFIXES = [
  '/auth',
  '/posts',
  '/student-articles',
  '/tutor-applications',
  '/subscribers',
  '/comments',
  '/uploads',
];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  mkdirSync(join(process.cwd(), 'uploads'), { recursive: true });
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });

  const frontendDist =
    process.env.FRONTEND_DIST_DIR?.trim()
      ? join(process.cwd(), process.env.FRONTEND_DIST_DIR.trim())
      : join(process.cwd(), '..', 'out');
  const hasFrontendBuild = existsSync(frontendDist);
  if (hasFrontendBuild) {
    app.useStaticAssets(frontendDist);
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.method !== 'GET') return next();
      if (API_PREFIXES.some((prefix) => req.path.startsWith(prefix))) return next();

      const cleanPath = req.path.replace(/\/+$/, '') || '/';
      const directHtml = join(frontendDist, `${cleanPath}.html`);
      const nestedHtml = join(frontendDist, cleanPath, 'index.html');
      const homeHtml = join(frontendDist, 'index.html');

      if (existsSync(directHtml)) {
        return res.sendFile(directHtml);
      }
      if (existsSync(nestedHtml)) {
        return res.sendFile(nestedHtml);
      }
      if (existsSync(homeHtml)) {
        return res.sendFile(homeHtml);
      }
      return next();
    });
  }

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) ?? true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = Number(process.env.PORT ?? 5000);
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
  if (hasFrontendBuild) {
    console.log(`Serving frontend from: ${frontendDist}`);
  }
}

void bootstrap();
