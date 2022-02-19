import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ValidateProductsService } from './validate-products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ValidateProductsService],
})
export class ProductsModule {}
