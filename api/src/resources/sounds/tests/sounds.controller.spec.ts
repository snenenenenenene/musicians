import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../database/database.module';
import { EntitiesProviders_Sounds } from '../../../database/entities.providers';
import { SoundsController } from '../sounds.controller';
import { SoundsService } from '../sounds.service';

describe('SoundsController', () => {
  let controller: SoundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoundsController],
      providers: [
        SoundsService,
        ...EntitiesProviders_Sounds
      ],
    }).compile();

    controller = module.get<SoundsController>(SoundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
