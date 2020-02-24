import { createConnection } from "typeorm";
import { UnidadeModel } from "src/unidade/models/unidade.model";

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: "oracle",
            connectString: process.env.CONNECT_STRING,
            username: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            entities: [
                UnidadeModel
            ],
            synchronize: true,
        }),
    },
];
