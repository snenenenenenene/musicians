import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesProviders_Goals } from '../../../database/entities.providers';
import { GoalsController } from '../goals.controller';
import { GoalsService } from '../goals.service';

describe('GoalsController', () => {
  let controller: GoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalsController],
      providers: [
        GoalsService,
        ...EntitiesProviders_Goals
      ],
    }).compile();

    controller = module.get<GoalsController>(GoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
