import { Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts() {
    return this.productsRepository.getProducts();
  }

  async callProcWithoutParams() {
    return this.productsRepository.callProcWithoutParams();
  }

  async callProcWithParams() {
    return this.productsRepository.callProcWithParams();
  }

  async callProcWithOutputParams() {
    return this.productsRepository.callProcWithOutputParams();
  }

  createProduct(product: Product) {
    return;
  }
}
