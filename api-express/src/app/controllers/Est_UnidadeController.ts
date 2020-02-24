import { createConnection } from "typeorm";
import * as oracledb from 'oracledb';
import * as Yup from 'yup';

import { Est_unidades } from '../models/Est_unidades';
import { Est_UnidadeRepository } from '../repository/Est_UnidadeRepository';

export class Est_UnidadeController {
  constructor() {
  }

  public async index(req, res) {
    let connection;
    try {
      connection = await oracledb.getConnection();
      const unidadeRepository = new Est_UnidadeRepository(connection);

      const est_unidade = await unidadeRepository.findAll();
      return res.json(est_unidade);

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

  public async show(req, res) {
    const schemas = Yup.object().shape({
      uni_st_unidade: Yup.string().required(),
    });
    if (!(await schemas.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let connection;
    try {
      connection = await oracledb.getConnection();
      const unidadeRepository = new Est_UnidadeRepository(connection);

      if (!await unidadeRepository.exists([req.body.uni_st_unidade])) {
        return res.status(400).json({ error: 'Unidade not exists' });
      } else {
        const est_unidade = await unidadeRepository.findById([req.body.uni_st_unidade]);
        return res.json(est_unidade);
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

  public async create(req, res) {
    const schemas = Yup.object().shape({
      uni_st_unidade: Yup.string().required().max(8),
      uni_st_nome: Yup.string().required().max(25),
      pun_in_decimaisqtde: Yup.number().positive().integer().min(0).max(3),
      pun_in_descimaisvalor: Yup.number().positive().integer().min(0).max(6),
      uni_st_calcsegundo: Yup.string().required().max(1),
    });

    if (!(await schemas.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let connection;
    try {
      connection = await oracledb.getConnection();
      const unidadeRepository = new Est_UnidadeRepository(connection);

      if (await unidadeRepository.exists([req.body.uni_st_unidade])) {
        return res.status(400).json({ error: 'Unidade already exists' });
      } else {

        const boryUnidade = req.body as Object;
        const newUnidade = Object.values(boryUnidade);

        const resultUnidade = await unidadeRepository.create(newUnidade);
        return res.json(resultUnidade);
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

  public async update(req, res) {
    const schemas = Yup.object().shape({
      uni_st_unidade: Yup.string().required().max(8),
      uni_st_nome: Yup.string().required().max(25),
      pun_in_decimaisqtde: Yup.number().positive().integer().min(0).max(3),
      pun_in_descimaisvalor: Yup.number().positive().integer().min(0).max(6),
      uni_st_calcsegundo: Yup.string().required().max(1),
      update_uni_st_unidade: Yup.string().required().max(8),

    });
    if (!(await schemas.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let connection;
    try {
      connection = await oracledb.getConnection();
      const unidadeRepository = new Est_UnidadeRepository(connection);

      if (!await unidadeRepository.exists([req.body.update_uni_st_unidade])) {
        return res.status(400).json({ error: 'Unidade not exists' });
      } else {

        const boryUnidade = req.body as Object;
        const newUnidade = Object.values(boryUnidade);

        const resultUnidade = await unidadeRepository.update(newUnidade);
        return res.json(resultUnidade);
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

  public async destroy(req, res) {
    const schemas = Yup.object().shape({
      uni_st_unidade: Yup.string().required(),
    });

    if (!(await schemas.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let connection;
    try {
      connection = await oracledb.getConnection();
      const unidadeRepository = new Est_UnidadeRepository(connection);
      const est_unidade = await unidadeRepository.destroy([req.body.uni_st_unidade]);
      return res.json(est_unidade);

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
export default new Est_UnidadeController();  