import { Injectable } from '@nestjs/common';
import Product from './models/product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [new Product('1', 'Test1'), new Product('2', 'Test2')];

  async getProducts(): Promise<Product[]> {
    return [...this.products];
  }

  createProduct(product: Product) {
    return;
  }
}
