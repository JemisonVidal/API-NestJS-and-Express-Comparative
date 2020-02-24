import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './conexao/connectionPoolOracle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3334);
}
bootstrap();
