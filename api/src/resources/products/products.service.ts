import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntitiesConstants } from '../../database/entities.constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  
  constructor(
    @Inject(EntitiesConstants.PRODUCTS_REPOSITORY)
    private ProductRepository: typeof Product,
  ) {}
  
  /* Get all products saved in the database 
  TODO: add pagination
  */
  async findAll() : Promise<Product[]> {
    return await this.ProductRepository.findAll({
      include: [
        "sound", 
        "owner",
        "buyer"
      ]
    });
  }
  
  /* Create a new product
    A product must:
      have a name and price
      belong to a band
      
    EXCEPTIONS:
      - no ownerId, name or price given
      - no band with given ownerId exists
  */
  async create(ownerId:number, productDto: CreateProductDto) : Promise<Product> {
    const product = new Product(productDto);
    product.ownerId = ownerId;
    
    return product.save()
    .catch(err => {
      console.log(err);
      throw err;
    })
  }
  
  /* Upload the thumbnail for a product 
    Only bands can upload thumnails to a product
  */
    uploadThumbnail(id: string, thumbnail: any): Promise<Product> {
      return this.ProductRepository.findByPk(id)
      .catch((err) => {
        if(err) return err;
      })
      
      .then((product: Product) => {
        product.thumbnail = thumbnail.buffer.toString('base64');
        return product.save();
      });
    }
  

  /* Retrieve a product from the database
  
  EXCEPTIONS:
    - given id not found
  */
  async findByPk(id: number): Promise<Product> {
    const foundRecord = await this.ProductRepository.findByPk(id);
    
    if(!foundRecord) 
      throw new NotFoundException;
    else 
      return foundRecord;
  }

  
  /* update the product of a band.
    Only the band itself can update its product.
    
    EXCEPTIONS:
      - You cannot update the products of another band
      - product with given id does not exist
  */
  async update(id: number, productDto: UpdateProductDto) : Promise<[number]> {
    return this.ProductRepository.update({productDto}, {
      where: { id: +id }
    })
  }

  /* A band cant delete a product unless it hasn't yet been bought by a user.
    Otherwise, it can only hide the product
    TODO Add a 'hidden' tag thingy to products
    
    EXCEPTIONS:
      You cannot delete the products of another band
      - product with given id does not exist
   */
  async remove(id: number) {
    return this.ProductRepository.destroy({
      where: { id: +id }
    })
  }
}
