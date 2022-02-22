import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Auth } from 'src/auth/utils/auth.decorator';
import { CurrentUser } from 'src/auth/utils/current-user.decorator';
import { Roles } from 'src/auth/utils/role.decorator';
import { RolesGuard } from 'src/auth/utils/roles.guard';

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

  @UseGuards(RolesGuard)
  @Get('as-admin')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  async asAdmin(): Promise<any> {
    return 'User is admin';
  }

  @UseGuards(RolesGuard)
  @Get('as-client')
  @Roles('client')
  @HttpCode(HttpStatus.OK)
  async asClient(): Promise<any> {
    return 'User is client';
  }
}
