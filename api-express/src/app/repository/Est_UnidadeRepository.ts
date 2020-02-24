import * as oracledb from "oracledb";

const queryFindAll = `
  select * 
    from EST_UNIDADES
   where UNI_TAB_IN_CODIGO = 103
     and UNI_PAD_IN_CODIGO = 1
`;

const queryFindById = `
  select *
    from EST_UNIDADES
   where UNI_TAB_IN_CODIGO = 103
     and UNI_PAD_IN_CODIGO = 1
     and UNI_ST_UNIDADE = :UNI_ST_UNIDADE
`;

const queryCreate = `
  insert into MGADM.EST_UNIDADES
    (UNI_TAB_IN_CODIGO,
    UNI_PAD_IN_CODIGO,
    UNI_ST_UNIDADE,
    UNI_ST_NOME,
    UNF_IN_CODIGO,
    PUN_IN_DECIMAISQTDE,
    PUN_IN_DECIMAISVALOR,
    UNI_ST_CALCSEGUNDO)
  values
    (103,
    1,
    :UNI_ST_UNIDADE,
    :UNI_ST_NOME,
    :UNF_IN_CODIGO,
    :PUN_IN_DECIMAISQTDE,
    :PUN_IN_DECIMAISVALOR,
    :UNI_ST_CALCSEGUNDO)
`
const queryDelete = `
  delete from MGADM.EST_UNIDADES
   where UNI_TAB_IN_CODIGO = 103
     and UNI_PAD_IN_CODIGO = 1
     and UNI_ST_UNIDADE = :UNI_ST_UNIDADE
`

const queryUpdade = `
  update MGADM.EST_UNIDADES
     set UNI_ST_UNIDADE       = :UNI_ST_UNIDADE,
         UNI_ST_NOME          = :UNI_ST_NOME,
         UNF_IN_CODIGO        = :UNF_IN_CODIGO,
         PUN_IN_DECIMAISQTDE  = :PUN_IN_DECIMAISQTDE,
         PUN_IN_DECIMAISVALOR = :PUN_IN_DECIMAISVALOR,
         UNI_ST_CALCSEGUNDO   = :UNI_ST_CALCSEGUNDO
   where UNI_TAB_IN_CODIGO    = 103
     and UNI_PAD_IN_CODIGO    = 1
     and UNI_ST_UNIDADE       = :UPDADE_UNI_ST_UNIDADE
`

export class Est_UnidadeRepository {
  private _connection: oracledb.IConnection;
  private _options: oracledb.IExecuteOptions

  constructor(connection: oracledb.IConnection) {
    this._connection = connection;
    this._options = {
      outFormat: oracledb.OBJECT,
      autoCommit: true
    }
  }

  public async findAll() {
    return (await this._connection.execute(queryFindAll, [], this._options)).rows;
  }

  public async findById(bindParams: Object) {
    return (await this._connection.execute(queryFindById, bindParams, this._options)).rows;
  }

  public async exists(bindParams: Object) {
    const result = (await this._connection.execute(queryFindById, bindParams, this._options)).rows;
    return (result.length > 0);
  }

  public async create(bindParams: Object) {
    try {
      await this._connection.execute(queryCreate, bindParams, this._options);
      return { message: "Unidade created" };
    } catch (error) {
      return { error: "Error", message: error.message };
    }
  }

  public async update(bindParams: Object) {
    try {
      await this._connection.execute(queryUpdade, bindParams, this._options);
      return { message: "Unidade updated" };
    } catch (error) {
      return { error: "Error", message: error.message };
    }
  }

  public async destroy(bindParams: Object) {
    try {
      (await this._connection.execute(queryDelete, bindParams, this._options)).rows;
      return { message: "Unidade removed" };
    } catch (error) {
      return { error: "Error", message: error.message };
    }
  }
}