import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'

import { AdminUserService } from '../services/adminUsers.service'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/createUserDto'

import { AuthDeclaration } from 'src/modules/auth/decorators/authDeclaration.decorator'
import { VerifyEmail } from '../pipes/verify-email.pipe'

@Controller('adminsUsers')
export class AdminUsersController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @AuthDeclaration('jwt', 'admin')
  @Get()
  public async getAllAdminUsers(): Promise<User[]> {
    const admins = await this.adminUserService.getAdminUsers()

    return admins
  }

  @Post()
  @UsePipes(VerifyEmail)
  public async createAdminUser(@Body() data: CreateUserDto): Promise<User> {
    const newUserAdmin = await this.adminUserService.createAdminUser(data)

    return newUserAdmin
  }
}
