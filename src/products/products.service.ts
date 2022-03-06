import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { Product } from './models/product.model';
import * as sql from 'mssql';

@Injectable()
export class ProductsService {
  products: Product[] = [new Product('1', 'Test1'), new Product('2', 'Test2')];

  constructor(private databaseService: DatabaseService) {}

  async getProducts() {
    return [...this.products];
  }

  // 1
  // exec proc without params
  // async workWithDatabase(): Promise<Product[]> {
  //   let data = await this.databaseService.execProcedure(
  //     'Gastronomy.usp_Product_GetAll',
  //   );
  //   return [...data.recordsets[0]];
  // }

  // 2
  // exec proc with input params
  // async workWithDatabase(): Promise<any> {
  //   let data = await this.databaseService.execProcedure('dbo.usp_test_IO', [
  //     { name: 'inputOne', value: 'tesst1', type: sql.VarChar(10) },
  //     { name: 'inputTwo', value: 'tesst2', type: sql.VarChar(10) },
  //   ]);
  //   return data.result;
  // }

  // 3
  // exec proc with output params
  async workWithDatabase(): Promise<any> {
    let data = await this.databaseService.execProcedure(
      'dbo.usp_test_IO',
      [
        { name: 'inputOne', value: 'tesst1', type: sql.VarChar(10) },
        { name: 'inputTwo', value: 'tesst2', type: sql.VarChar(10) },
      ],
      [{ name: 'outputOne', value: '', type: sql.VarChar(30) }],
    );
    return data.outputParams['outputOne'];
  }

  createProduct(product: Product) {
    return;
  }
}
