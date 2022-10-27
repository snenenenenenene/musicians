import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_BandMembers } from '../../database/entities.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...EntitiesProviders_BandMembers
  ]
})
export class BandMemberModule {}