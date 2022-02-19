import { Injectable } from '@nestjs/common';
import Product from './product.model';

@Injectable()
export class ProductsService {
  getProducts(): string {
    return 'products';
  }

  createProduct(product: Product) {
    return;
  }
}
