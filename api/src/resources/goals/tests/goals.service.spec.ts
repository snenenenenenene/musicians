import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesProviders_Goals } from '../../../database/entities.providers';
import { GoalsService } from '../goals.service';

describe('GoalsService', () => {
  let service: GoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoalsService,
        ...EntitiesProviders_Goals
      ],
    }).compile();

    service = module.get<GoalsService>(GoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
    
  //----------------------------------------------------------------------------------
  describe('Adding new Goals to a Band', () => { 
    it('calls the method to create the new Goal', async () => {
      const expectedResult = []
    });
    
    it('', async () => {
      
    });
  });
  
});
