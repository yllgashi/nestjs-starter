import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Product from './models/product.model';

@Injectable()
export class ValidateProductsService {
  validateProduct(product: Product): void {
    if (!product)
      throw new HttpException('Product is not sent', HttpStatus.NOT_ACCEPTABLE);

    if (!product.id || !product.name)
      throw new HttpException(
        'Name and Id is incorrect',
        HttpStatus.NOT_ACCEPTABLE,
      );
  }
}
