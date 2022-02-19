import { Body, Controller, Get, Post } from '@nestjs/common';
import ResponseModel from 'src/shared/models/response.model';
import Product from './product.model';
import { ProductsService } from './products.service';
import { ValidateProductsService } from './validate-products.service';

@Controller({ path: 'products' })
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly validateProductsService: ValidateProductsService,
  ) {}

  @Get()
  async getProducts(): Promise<any> {
    return this.productsService.getProducts();
  }

  @Post()
  async createProduct(@Body('product') product: Product): Promise<any> {
    // check if is valid (if is not, "Invalid data are sent" response will be sent from service error)
    this.validateProductsService.validateProduct(product);
    // if product is valid
    return this.productsService.createProduct(product);
  }
}
