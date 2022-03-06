import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { Product } from './models/product.model';
import * as sql from 'mssql';

@Injectable()
export class ProductsRepository {
  products: Product[] = [new Product('1', 'Test1'), new Product('2', 'Test2')];

  constructor(private databaseService: DatabaseService) {}

  async getProducts() {
    return [...this.products];
  }

  async callProcWithoutParams() {
    let data = await this.databaseService.execProcedure(
      'dbo.usp_Table1_WithoutParams',
    );
    return data.result;
  }

  // 1
  // exec proc without params
  async callProcWithParams() {
    let data = await this.databaseService.execProcedure(
      'dbo.usp_Table1_WithParams',
      [
        { name: 'inputOne', value: 'tesst1', type: sql.VarChar(10) },
        { name: 'inputTwo', value: 'tesst2', type: sql.VarChar(10) },
      ],
    );
    return data.result;
  }

  // 3
  // exec proc with output params
  async callProcWithOutputParams(): Promise<any> {
    let data = await this.databaseService.execProcedure(
      'dbo.usp_Table1_WithOutputParams',
      [
        { name: 'inputOne', value: 'tesst1', type: sql.VarChar(10) },
        { name: 'inputTwo', value: 'tesst2', type: sql.VarChar(10) },
      ],
      [{ name: 'outputOne', value: '', type: sql.VarChar(30) }],
    );
    return data.outputParams['outputOne'];
  }
}
