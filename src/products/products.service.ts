import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import Product from './models/product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [new Product('1', 'Test1'), new Product('2', 'Test2')];

  constructor(private connection: Connection) {}

  async getProducts(): Promise<Product[]> {
    let data = await this.connection.query('EXEC Gastronomy.usp_Product_GetAll');

    return data
  }

  // async getProducts(): Promise<Product[]> {
  //   const queryRunner = this.connection.createQueryRunner();

  //   // you can use its methods only after you call connect
  //   // which performs real database connection
  //   await queryRunner.connect();

  //   // .. now you can work with query runner and call its methods

  //   // very important - don't forget to release query runner once you finished working with it
  //   await queryRunner.release();
  // }

  createProduct(product: Product) {
    return;
  }
}
