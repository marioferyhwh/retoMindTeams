import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const version = 'api/v1';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(version);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('Api training')
    .setDescription('The training API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
