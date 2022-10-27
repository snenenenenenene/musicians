import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_BandMembers, EntitiesProviders_Bands, EntitiesProviders_FanRecords, EntitiesProviders_Goals, EntitiesProviders_GroupieRecords, EntitiesProviders_Products, EntitiesProviders_Sounds } from '../../database/entities.providers';
import { StripeModule } from '../../stripe/stripe.module';
import { GoalsModule } from '../goals/goals.module';
import { ProductsModule } from '../products/products.module';
import { SoundsModule } from '../sounds/sounds.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { BandController } from './band.controller';
import { BandService } from './band.service';


@Module({
  imports: [
    DatabaseModule,
    TransactionsModule,
    ProductsModule,
    GoalsModule,
    SoundsModule,
    StripeModule
  ],
  controllers: [BandController],
  providers: [
    BandService,
    ...EntitiesProviders_Bands,
    ...EntitiesProviders_FanRecords,
    ...EntitiesProviders_GroupieRecords,
    ...EntitiesProviders_BandMembers,
  ],
  exports: [
    BandService
  ]
})
export class BandModule {}
