import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ValidateProductsService } from './validate-products.service';
import ProductValidators from './validators/product.validator';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ValidateProductsService, ProductValidators],
})
export class ProductsModule {}
