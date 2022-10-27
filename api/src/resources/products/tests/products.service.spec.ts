import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesProviders_Products } from '../../../database/entities.providers';
import { ProductsService } from '../products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        ...EntitiesProviders_Products
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  
  //----------------------------------------------------------------------------------
  describe('Adding new Products to a Band', () => { 
    it('calls the method to create the new Product', async () => {

    });
    
    it('', async () => {
      
    });
  });
  
});
