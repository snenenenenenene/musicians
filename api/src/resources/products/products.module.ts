import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_Products } from '../../database/entities.providers';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...EntitiesProviders_Products
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
