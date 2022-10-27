import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesProviders_BandMembers, EntitiesProviders_BoughtProducts, EntitiesProviders_FanRecords, EntitiesProviders_GroupieRecords, EntitiesProviders_Products, EntitiesProviders_Users } from '../../../database/entities.providers';
import { UsersService } from '../users.service';

const search = jest.fn();
jest.mock('auth0', () => ({
  ManagementClient: jest.fn(() => ({ search }))
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ...EntitiesProviders_Users,
        ...EntitiesProviders_Products,
        ...EntitiesProviders_FanRecords,
        ...EntitiesProviders_GroupieRecords,
        ...EntitiesProviders_BandMembers,
        ...EntitiesProviders_BoughtProducts
      ],
    }).compile();
    
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
