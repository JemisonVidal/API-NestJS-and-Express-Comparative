import { createConnection } from "typeorm";

const connection = async () => {
    await createConnection({
        type: "oracle",
        connectString: process.env.CONNECT_STRING,
        username: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        entities: [
            "../app/models*.ts"
        ],
        synchronize: true,
    }).then(connection => {
        console.log('Models Connected');
    }).catch(error => console.log(error));
};

const connectionORM = connection();
export default connectionORM; 