import { Controller, Get, HttpException, HttpStatus, NotFoundException, Param } from '@nestjs/common';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /* Get all products saved in the database
  TODO: add pagination
  */
  @Get()
  findAll(): Promise<void | Product[]> {
    return this.productsService.findAll();
  }
  
  /* Get a product by ID
  EXCEPTIONS:
    + 404: product not found
  */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<void | Product> {
    return this.productsService.findByPk(+id)
    .catch(err => {
      if(err instanceof NotFoundException)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    })
  }

}
