import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import {
  EntitiesProviders_BandMembers,
  EntitiesProviders_BoughtProducts,
  EntitiesProviders_FanRecords,
  EntitiesProviders_GroupieRecords,
  EntitiesProviders_Users
} from '../../database/entities.providers';
import { ProductsModule } from '../products/products.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...EntitiesProviders_Users,
    ...EntitiesProviders_FanRecords,
    ...EntitiesProviders_GroupieRecords,
    ...EntitiesProviders_BandMembers,
    ...EntitiesProviders_BoughtProducts
  ],
})
export class UsersModule {}
