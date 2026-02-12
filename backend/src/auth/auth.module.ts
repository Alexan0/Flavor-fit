import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '@prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '@config/jwt.config';
import { UsersModule } from '@users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [PrismaModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UsersModule,
  ],
  providers: [JwtStrategy, AuthService, AuthResolver],
})
export class AuthModule {}
