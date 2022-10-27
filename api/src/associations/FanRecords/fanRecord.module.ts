import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_FanRecords } from '../../database/entities.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...EntitiesProviders_FanRecords
  ]
})
export class FanRecordModule {}
