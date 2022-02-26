import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import Product from './models/product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [new Product('1', 'Test1'), new Product('2', 'Test2')];

  constructor(private connection: Connection) {}

  async getProducts(): Promise<Product[]> {
    let data = await this.connection.query('SELECT * FROM Gastronomy.Product');
    return data
  }

  createProduct(product: Product) {
    return;
  }
}
