import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GeneralExceptionFilter } from './shared/filters/general-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // manage exceptions for all aplliaction errors
  app.useGlobalFilters(new GeneralExceptionFilter());

  // swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Application name')
    .setDescription('Application description')
    .setVersion('1.0')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
