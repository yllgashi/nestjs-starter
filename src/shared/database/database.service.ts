import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';

import { dbconfig } from './db.config';

@Injectable()
export class DatabaseService {
  constructor() {}

  private async getPool() {}

  async execProcedure() {
    let pool = await sql.connect(dbconfig.prod);
    let products = await pool
      .request()
      .query('select * from Gastronomy.Product');
    console.log(products);
  }
}
