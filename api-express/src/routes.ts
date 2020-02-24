import { Router } from 'express';
import Est_UnidadeController from './app/controllers/Est_UnidadeController';

class Routers {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get('/unidades', Est_UnidadeController.index);
        this.router.get('/unidade', Est_UnidadeController.show);
        this.router.post('/unidade', Est_UnidadeController.create);
        this.router.put('/unidade', Est_UnidadeController.update);
        this.router.delete('/unidade', Est_UnidadeController.destroy);
    }
}
export default new Routers().router;