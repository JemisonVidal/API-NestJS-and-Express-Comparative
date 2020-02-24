import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';

class App {
  server: express.Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(bodyParser.json())
  }

  public routes() {
    this.server.use(routes);
  }
}

export default new App().server;
