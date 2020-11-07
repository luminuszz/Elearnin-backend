import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../users/users.module'
import { AuthService } from './services/auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/config/constants'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
