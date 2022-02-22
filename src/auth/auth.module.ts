import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';
import { AuthController } from './auth.controller';
import { ValidateAuthService } from './validate-auth.service';
import AuthValidators from './validators/auth.validator';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // secret: `${process.env.JWT_SECRET_KEY}`,
      secret: 'secret',
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ValidateAuthService, AuthValidators],
})
export class AuthModule {}
