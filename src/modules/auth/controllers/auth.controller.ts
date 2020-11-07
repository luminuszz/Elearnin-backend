import { Controller, Post, UseGuards, Request } from '@nestjs/common'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { Request as ExpressRequest } from 'express'
import { AuthService } from '../services/auth.service'
import { User } from '../../users/entities/user.entity'
import { UsersService } from '../../users/services/users.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Request() req: ExpressRequest
  ): Promise<ExpressRequest['user']> {
    return this.authService.login(req.user as User)
  }
}
