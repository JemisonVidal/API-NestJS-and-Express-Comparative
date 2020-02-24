import app from './app';
import './conexao/connectionPoolOracle';

const start = async () => {
    app.listen(3333);
};

start();
