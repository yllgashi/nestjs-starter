import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [SharedModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
