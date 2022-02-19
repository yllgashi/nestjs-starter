import { Controller, Get } from '@nestjs/common';
import ResponseModel from 'src/utils/response.model';
import { ProductsService } from './products.service';

@Controller({ path: 'products' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getHello(): Promise<any> {
    const data: string = this.productsService.getHello();
    return ResponseModel.success(data);
  }
}
