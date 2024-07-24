import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('StartSoft BackEnd Challenge API')
    .setDescription('The StartSoft BackEnd Challenge API API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get<string>('KAFKA_BROKER_URL')],
        ssl: true,
        sasl: {
          mechanism: 'scram-sha-256',
          username: configService.get<string>('KAFKA_USERNAME'),
          password: configService.get<string>('KAFKA_PASSWORD'),
        },
      },
      consumer: {
        groupId: 'nestjs-group',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000, () => {
    console.log('Application is running on: http://localhost:3000');
    console.log(
      'Swagger documentation is available on: http://localhost:3000/api',
    );
  });
}
bootstrap();
