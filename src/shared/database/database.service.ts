import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';

import { dbconfig } from './db.config';
import ProcedureResponse from './procedure-response.model';

@Injectable()
export class DatabaseService {
  constructor() {}

  async query(queryString) {
    const pool = new sql.ConnectionPool(dbconfig);
    await pool.connect();
    const result = await pool.query(queryString);
    pool.close();
    return result.recordsets;
  }

  async execProcedure(
    procedureName: string,
    inputParams: { name: string; value: any }[] = [],
    outputParams: { name: string; value: any }[] = [],
  ) {
    const pool = new sql.ConnectionPool(dbconfig);
    await pool.connect();

    // create request
    const request = await pool.request();
    // add input params
    inputParams.forEach((e) => request.input(e.name, e.value));
    // add output params
    outputParams.forEach((e) => request.output(e.name, e.value));
    // execute procedure
    const result = await request.execute(procedureName);
    pool.close();

    const procResponse: ProcedureResponse = {
      result: result.recordset,
      outputParams: result.output,
    };

    return procResponse;
  }
}
