import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/services/users.service'
import { ValidateUserDTo } from '../dtos/ValidateUserDTO'
import * as bcrypt from 'bcrypt'
import { User } from 'src/modules/users/entities/user.entity'
import { PayloadDTO } from '../dtos/payload.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  public async validateUser({
    email,
    password,
  }: ValidateUserDTo): Promise<User> {
    const currentUser = await this.userService.FindByEmail(email)

    if (!currentUser) {
      return null
    }
    const compare = await bcrypt.compare(password, currentUser.passwordHash)

    if (!compare) {
      return null
    }

    return currentUser
  }

  public async login({ email, id, name }: User): Promise<{ token: string }> {
    const payload: PayloadDTO = { email, id, name }

    const token = await this.jwtService.signAsync(payload)

    return {
      token,
    }
  }
}
