import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { Auth } from 'src/modules/auth/decorators/authType.decorator'
import { Roles } from 'src/modules/auth/decorators/role.decorator'
import { CreateUserDto } from '../dtos/createUserDto'
import { User } from '../entities/user.entity'
import { VerifyEmail } from '../pipes/verify-email.pipe'
import { UsersService } from '../services/users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(VerifyEmail)
  public async createUser(@Body() data: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.createUser(data)

    return newUser
  }

  @Get()
  @Auth('jwt')
  @Roles('admin')
  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers()

    return users
  }
}
