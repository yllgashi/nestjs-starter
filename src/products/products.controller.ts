import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/auth/utils/auth.decorator';
import { CurrentUser } from 'src/auth/utils/current-user.decorator';

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

  @Auth()
  @Get('as-authenticated')
  @HttpCode(HttpStatus.OK)
  async getProductsAsAuthenticated(): Promise<any> {
    return 'VALID: response is sent only if request has authorization in header';
  }

  @Auth()
  @Get('who-am-i')
  @HttpCode(HttpStatus.OK)
  async whoAmI(@CurrentUser() user: any): Promise<any> {
    return user;
  }

  @Auth()
  @Get('my-id')
  @HttpCode(HttpStatus.OK)
  async getMId(@CurrentUser('userId') userId: any): Promise<any> {
    return userId;
  }

  @Auth('admin')
  @Get('as-admin')
  @HttpCode(HttpStatus.OK)
  async asAdmin(): Promise<any> {
    return 'User is admin';
  }

  @Auth('client')
  @Get('as-client')
  @HttpCode(HttpStatus.OK)
  async asClient(): Promise<any> {
    return 'User is client';
  }

  @Auth('client', 'admin')
  @Get('as-both')
  @HttpCode(HttpStatus.OK)
  async asBoth(): Promise<any> {
    return 'User is admin/client';
  }
}
