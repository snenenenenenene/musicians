import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_GroupieRecords } from '../../database/entities.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...EntitiesProviders_GroupieRecords
  ]
})
export class GroupieRecordModule {}