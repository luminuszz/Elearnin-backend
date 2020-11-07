import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { CreateUserDto } from '../dtos/createUserDto'
import { User } from '../entities/user.entity'
import { VerifyEmail } from '../pipes/verify-email.pipe'
import { UsersService } from '../services/users.service'

@Controller('admin')
export class AdminUsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  @UsePipes(VerifyEmail)
  public async createAdmin(@Body() data: CreateUserDto): Promise<User> {
    const newUser = await this.userService.createAdminUser(data)

    return newUser
  }

  @Get()
  public async getAllAdminUsers(): Promise<User[]> {
    const admins = await this.userService.getAllAdminUsers()

    return admins
  }
}
