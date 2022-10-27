import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_Transactions } from '../../database/entities.providers';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ...EntitiesProviders_Transactions
  ],
  exports: [
    TransactionsService
  ]
    
})
export class TransactionsModule {}
