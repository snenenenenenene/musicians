import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_LikedSounds } from '../../database/entities.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...EntitiesProviders_LikedSounds
  ]
})
export class LikedSoundModule {}