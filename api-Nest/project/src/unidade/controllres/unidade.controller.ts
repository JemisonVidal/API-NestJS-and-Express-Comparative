import * as oracledb from 'oracledb';
import { Get, Controller, Post, Body, Delete, Put } from '@nestjs/common';
import { Est_UnidadeRepository } from '../repository/Est_Unidade.Repository';

@Controller('v1/unidades')
export class UnidadeController {
    constructor() { }

    @Get('/index')
    async get(): Promise<UnidadeController[]> {
        let connection;
        try {
            connection = await oracledb.getConnection();
            const unidadeRepository = new Est_UnidadeRepository(connection);

            const est_unidade = await unidadeRepository.findAll();
            return est_unidade;

        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    @Get('')
    async show(@Body('uni_st_unidade') uni_st_unidade: string) {
        let connection;
        try {
            connection = await oracledb.getConnection();
            const unidadeRepository = new Est_UnidadeRepository(connection);

            if (!await unidadeRepository.exists([uni_st_unidade])) {
                return { erro: "Unidade not exists" }
            } else {
                const est_unidade = await unidadeRepository.findById([uni_st_unidade]);
                return est_unidade;
            }
        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    @Put()
    async update(
        @Body('uni_st_unidade') uni_st_unidade: string,
        @Body('uni_st_nome') uni_st_nome: string,
        @Body('unf_in_codigo') unf_in_codigo: number,
        @Body('pun_in_decimaisqtde') pun_in_decimaisqtde: number,
        @Body('pun_in_decimaisvalor') pun_in_decimaisvalor: number,
        @Body('uni_st_calcsegundo') uni_st_calcsegundo: string,
        @Body('update_uni_st_unidade') update_uni_st_unidade: string,
    ) {
        let connection;
        try {
            connection = await oracledb.getConnection();
            const unidadeRepository = new Est_UnidadeRepository(connection);

            if (!await unidadeRepository.exists([update_uni_st_unidade])) {
                return { error: 'Unidade not exists' };
            } else {
                const resultUnidade = await unidadeRepository.update([uni_st_unidade,
                    uni_st_nome,
                    unf_in_codigo,
                    pun_in_decimaisqtde,
                    pun_in_decimaisvalor,
                    uni_st_calcsegundo,
                    update_uni_st_unidade]);
                return resultUnidade;
            }
        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    @Post()
    async create(
        @Body('uni_st_unidade') uni_st_unidade: string,
        @Body('uni_st_nome') uni_st_nome: string,
        @Body('unf_in_codigo') unf_in_codigo: number,
        @Body('pun_in_decimaisqtde') pun_in_decimaisqtde: number,
        @Body('pun_in_decimaisvalor') pun_in_decimaisvalor: number,
        @Body('uni_st_calcsegundo') uni_st_calcsegundo: string,
    ) {
        let connection;
        try {
            connection = await oracledb.getConnection();
            const unidadeRepository = new Est_UnidadeRepository(connection);

            if (await unidadeRepository.exists([uni_st_unidade])) {
                return { error: 'Unidade already exists' };
            } else {
                const newUnidade = [uni_st_unidade,
                    uni_st_nome,
                    unf_in_codigo,
                    pun_in_decimaisqtde,
                    pun_in_decimaisvalor,
                    uni_st_calcsegundo]
                const resultUnidade = await unidadeRepository.create(newUnidade);
                return resultUnidade;
            }
        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    @Delete()
    async destroy(@Body('uni_st_unidade') uni_st_unidade: string) {
        let connection;
        try {
            connection = await oracledb.getConnection();
            const unidadeRepository = new Est_UnidadeRepository(connection);
            const est_unidade = await unidadeRepository.destroy([uni_st_unidade]);
            return est_unidade;

        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}