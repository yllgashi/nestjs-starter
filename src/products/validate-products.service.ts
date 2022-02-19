import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Product from './product.model';

@Injectable()
export class ValidateProductsService {
  async validateProduct(product: Product): Promise<void> {
    if (!product.id || !product.name)
      throw new HttpException(
        'Name and Id is incorrect',
        HttpStatus.NOT_ACCEPTABLE,
      );
  }
}
