import { Test } from '@nestjs/testing';
import { EntitiesProviders_BandMembers, EntitiesProviders_Bands, EntitiesProviders_FanRecords, EntitiesProviders_Goals, EntitiesProviders_GroupieRecords, EntitiesProviders_Products, EntitiesProviders_Sounds, EntitiesProviders_Transactions } from '../../../database/entities.providers';
import { StripeService } from '../../../stripe/stripe.service';
import { GoalsService } from '../../goals/goals.service';
import { ProductsService } from '../../products/products.service';
import { SoundsService } from '../../sounds/sounds.service';
import { TransactionsService } from '../../transactions/transactions.service';
import { BandController } from '../band.controller';
import { BandService } from '../band.service';
import { Band } from '../models/band.model';
import { mockBands } from './mocks/bands.mock'

describe('---- BandController ----', () => {
  let controller: BandController;
  let bandService: BandService;
  let transactionService: TransactionsService;
  let productsService: ProductsService;
  let goalsService: GoalsService;
  let soundsService: SoundsService;
  let stripeService: StripeService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BandController],
      providers: [
        BandService,
        TransactionsService,
        ProductsService,
        GoalsService,
        SoundsService,
        StripeService,
        ...EntitiesProviders_Bands,
        ...EntitiesProviders_FanRecords,
        ...EntitiesProviders_GroupieRecords,
        ...EntitiesProviders_BandMembers,
        ...EntitiesProviders_Transactions,
        ...EntitiesProviders_Products,
        ...EntitiesProviders_Goals,
        ...EntitiesProviders_Sounds,
      ],
    }).compile();
        
    controller = module.get<BandController>(BandController);
    bandService = module.get<BandService>(BandService);
  });
  
  
  afterEach(() => { 
    jest.resetAllMocks();
  });
  
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  // BANDS =========================================================================
  
  
  describe('findAll', () => { 
    it.only('should return an array of all bands', async () => {
      const expectedResult = mockBands;
      jest.spyOn(bandService, "findAll").mockResolvedValue(expectedResult as Band[]);
      
      const receivedResult = await controller.findAll()
      
      expect(receivedResult).toBe(expectedResult)
    });
  });
  
  describe('findOne', () => { 
    it('should return a single band by its identifier', async () => {
      const expectedResult = mockBands[0];
      jest.spyOn(bandService, "create").mockResolvedValue(mockBands[0] as Band)
      
      const receivedResult = await controller.create(mockBands[0])
      
      expect(receivedResult).toBe(expectedResult)
    });
    
    it('should ensure the given id is a number', async () => {
      
    });
  });
  
  describe('create', () => { 
    it('should invoke the method to create a new band and return it', async () => {
      const expectedResult = mockBands[0];
      jest.spyOn(bandService, "findByPk").mockResolvedValue(mockBands[0] as Band)
      
      const receivedResult = await controller.findOne(<string><unknown>mockBands[0].id)
      
      expect(receivedResult).toBe(expectedResult)
    });
    
    // it('should return a Bad Request exception', async () => {
      
    // });
  });
  
  // describe('uploadProfilePicture', () => { 
  //   it('should upload a profile picture to a band', async () => {
      
  //   });
  // });
  
  describe('update', () => { 
    it('should update the properties of an existing band', async () => {
      
    });
  });
  
  // describe('remove', () => { 
  //   it('should remove an existing band', async () => {
      
  //   });
  // });
  
  // // PRODUCTS =========================================================================
  
  // describe('createProduct', () => { 
  //   it('should create a new product for a band', async () => {
      
  //   });
  // });
  
  // describe('uploadThumbnail', () => { 
  //   it('should update a thumbnail to the product of a band', async () => {
      
  //   });
  // });
  
  // describe('getProducts', () => { 
  //   it('should get an array of all products of a band', async () => {
      
  //   });
  // });
  
  // describe('updateProduct', () => { 
  //   it('should update the properties of a product of a band', async () => {
      
  //   });
  // });
  
  // describe('removeProduct', () => { 
  //   it('should remove a product from a band', async () => {
      
  //   });
  // });
  
  // // TRANSACTIONS =========================================================================
  
  // describe('registerTransaction', () => { 
  //   it('should register a transaction to a band', async () => {
      
  //   });
  // });
  
  
  // // GOALS =========================================================================
  
  // describe('createGoal', () => { 
  //   it('should add a goal to a band', async () => {
      
  //   });
  // });
  
  // describe('getGoals', () => { 
  //   it('should return an array of all goals of a band', async () => {
      
  //   });
  // });
  
  // describe('updateGoal', () => { 
  //   it('should update the properties of a goal of a band', async () => {
      
  //   });
  // });
  
  // describe('removeGoal', () => { 
  //   it('should remove a goal from a band', async () => {
      
  //   });
  // });
  
  // // SOUNDS =========================================================================
  
  // describe('createSound', () => { 
  //   it('should create a new sound for a band', async () => {
      
  //   });
  // });
  
  // describe('getSounds', () => { 
  //   it('should return an array of all sounds of a band', async () => {
      
  //   });
  // });
  
  // describe('updateSound', () => { 
  //   it('should update the properties of an existing sound of a band', async () => {
      
  //   });
  // });
  
  // describe('removeSound', () => { 
  //   it('should remove a sound of a band', async () => {
      
  //   });
  // });
  
  // // FANS =========================================================================
  
  // describe('registerFan', () => { 
  //   it('should register a fan to a band', async () => {
      
  //   });
  // });
  
  // describe('getFans', () => { 
  //   it('should return an array of all fans of a band', async () => {
      
  //   });
  // });
  
  // describe('removeFan', () => { 
  //   it('should remove a fan from the list of fans of a band', async () => {
      
  //   });
  // });
  
  // // GROUPIES =========================================================================

  // describe('registerGroupie', () => { 
  //   it('should register a groupie to a band', async () => {
      
  //   });
  // });
  
  // describe('getGroupies', () => { 
  //   it('should return an array of all groupies of a band', async () => {
      
  //   });
  // });
  
  // describe('removeGroupie', () => { 
  //   it('should remove a groupies from the list of groupies of a band', async () => {
      
  //   });
  // });
  
});
