import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import Product from './models/product.model';
import { ProductsService } from './products.service';
import { ValidateProductsService } from './validate-products.service';

@Controller({ path: 'products' })
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly validateProductsService: ValidateProductsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts(): Promise<any> {
    return this.productsService.getProducts();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body('') product: Product): Promise<any> {
    // check if is valid (if is not, "Invalid data are sent" response will be sent from service error)
    this.validateProductsService.validateProduct(product);
    // if product is valid
    return this.productsService.createProduct(product);
  }
}
