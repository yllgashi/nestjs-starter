import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/utils/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import User from 'src/users/models/user.model';

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

  @UseGuards(JwtAuthGuard)
  @Get('as-authenticated')
  @HttpCode(HttpStatus.OK)
  async getProductsAsAuthenticated(): Promise<any> {
    return 'VALID: response is sent only if request has authorization in header';
  }

  @UseGuards(JwtAuthGuard)
  @Get('who-am-i')
  @HttpCode(HttpStatus.OK)
  async whoAmI(@CurrentUser() user: any): Promise<any> {
    return user;
    // return 'VALID: response is sent only if request has authorization in header';
  }
}
