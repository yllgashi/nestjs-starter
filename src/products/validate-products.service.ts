import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Product from './models/product.model';
import ProductValidators from './validators/product.validator';

@Injectable()
export class ValidateProductsService {
  constructor(private readonly productValidators: ProductValidators) {}

  validateProduct(product: Product): void {
    const { error } =
      this.productValidators.createProductSchema.validate(product);

    if (error)
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
  }
}
