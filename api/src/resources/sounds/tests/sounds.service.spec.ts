import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesProviders_Sounds } from '../../../database/entities.providers';
import { SoundsService } from '../sounds.service';

describe('SoundsService', () => {
  let service: SoundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoundsService,
        ...EntitiesProviders_Sounds
      ],
    }).compile();

    service = module.get<SoundsService>(SoundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  //----------------------------------------------------------------------------------
  describe('Adding new Sounds to a Band', () => { 
    it('calls the method to create the new Sound', async () => {

    });
    
    it('', async () => {
      
    });
  });
});
