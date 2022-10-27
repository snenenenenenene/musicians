import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../../database/database.module';
import { EntitiesProviders_Users } from '../../database/entities.providers';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    DatabaseModule
  ],
  providers: [
    JwtStrategy, 
    AuthService,
    ...EntitiesProviders_Users
  ],
  controllers: [AuthController],
  exports: [PassportModule]
})
export class AuthModule {}
