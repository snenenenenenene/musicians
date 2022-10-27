import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesProviders_BandMembers, EntitiesProviders_BoughtProducts, EntitiesProviders_FanRecords, EntitiesProviders_GroupieRecords, EntitiesProviders_Products, EntitiesProviders_Users } from '../../../database/entities.providers';
import { ProductsService } from '../../products/products.service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

const search = jest.fn();
jest.mock('auth0', () => ({
  ManagementClient: jest.fn(() => ({ search }))
}));

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        ProductsService,
        ...EntitiesProviders_Users,
        ...EntitiesProviders_Products,
        ...EntitiesProviders_FanRecords,
        ...EntitiesProviders_GroupieRecords,
        ...EntitiesProviders_BandMembers,
        ...EntitiesProviders_BoughtProducts
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
