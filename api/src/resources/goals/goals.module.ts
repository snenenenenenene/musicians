import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_Goals } from '../../database/entities.providers';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GoalsController],
  providers: [
    GoalsService,
    ...EntitiesProviders_Goals
  ],
  exports: [
    GoalsService
  ]
})
export class GoalsModule {}
