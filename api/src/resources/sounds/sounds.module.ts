import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_Sounds } from '../../database/entities.providers';
import { SoundsController } from './sounds.controller';
import { SoundsService } from './sounds.service';

@Module({
  imports: [    
    DatabaseModule
  ],
  controllers: [SoundsController],
  providers: [
    SoundsService,
    ...EntitiesProviders_Sounds
  ],
  exports: [
    SoundsService
  ]
})
export class SoundsModule {}
