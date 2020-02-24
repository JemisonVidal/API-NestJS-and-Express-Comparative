import { Module } from '@nestjs/common';
import { UnidadeController } from './controllres/unidade.controller';
//import { databaseProviders } from 'src/conexao/database.providers';


@Module({
    //providers: [...databaseProviders],
    //exports: [...databaseProviders],
    controllers: [UnidadeController]
})
export class UnidadeModule { }
