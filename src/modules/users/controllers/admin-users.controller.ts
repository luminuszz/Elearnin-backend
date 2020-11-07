import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'

import { RoleGuard } from '../../auth/guards/role-auth.guard'
import { JWtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { AdminUserService } from '../services/adminUsers.service'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/createUserDto'
import { VerifyEmail } from '../pipes/verify-email.pipe'

@UseGuards(JWtAuthGuard, RoleGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('adminsUsers')
export class AdminUsersController {
  constructor(private readonly adminUserService: AdminUserService) {}

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
