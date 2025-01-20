import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { generateValidationPipe } from 'src/common/infrastructure/response/validation-pipe';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cars API')
    .setDescription('An API for testing nestjs development')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  const validationPipe = generateValidationPipe();

  app.useGlobalPipes(validationPipe);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Server is running on port ${port}`);
}
bootstrap();
