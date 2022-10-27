import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BandModule } from './resources/bands/band.module';
import { UsersModule } from './resources/users/users.module';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { AuthModule } from './resources/auth/auth.module';
import { SoundsModule } from './resources/sounds/sounds.module';
import { GoalsModule } from './resources/goals/goals.module';
import { ProductsModule } from './resources/products/products.module';

@Module({
  imports: [

    BandModule,
    UsersModule,
    TransactionsModule,
    AuthModule,
    SoundsModule,
    GoalsModule,
    ProductsModule,
  ],
})

export class AppModule {}
