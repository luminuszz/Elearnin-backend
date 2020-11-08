import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from 'src/modules/users/entities/user.entity'
import { AuthService } from '../services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  public async validate(email: string, password: string): Promise<User> {
    const validateUser = await this.authService.validateUser({
      email,
      password,
    })

    if (!validateUser) {
      throw new UnauthorizedException('credentials incorrect')
    }

    return validateUser
  }
}
