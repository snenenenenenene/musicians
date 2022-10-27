import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_BoughtProducts } from '../../database/entities.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...EntitiesProviders_BoughtProducts
  ]
})
export class BoughtProductModule {}