import { Module } from '@nestjs/common';
import { UnidadeModule } from './unidade/unidade.module';

@Module({
  imports: [UnidadeModule],
})
export class AppModule { }
