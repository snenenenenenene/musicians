import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesProviders_Transactions } from '../../../database/entities.providers';
import { TransactionsController } from '../transactions.controller';
import { TransactionsService } from '../transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        ...EntitiesProviders_Transactions
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
