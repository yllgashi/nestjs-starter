import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import Product from './models/product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [new Product('1', 'Test1'), new Product('2', 'Test2')];

  constructor(private databaseService: DatabaseService) {}

  async getProducts(): Promise<Product[]> {
    await this.databaseService.execProcedure();
    return [...this.products];
  }

  createProduct(product: Product) {
    return;
  }
}
