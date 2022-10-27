import { Module } from '@nestjs/common';
import { EntitiesProviders_Bands } from '../database/entities.providers';
import { StripeService } from './stripe.service';

@Module({
  providers: [
    StripeService,
    ...EntitiesProviders_Bands,
  ],
  exports: [
    StripeService
  ]
})
export class StripeModule {}
