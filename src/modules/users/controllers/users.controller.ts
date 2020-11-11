import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthDeclaration } from 'src/modules/auth/decorators/authDeclaration.decorator'
import { CreateUserDto } from '../dtos/createUserDto'
import { User } from '../entities/user.entity'
import { VerifyEmail } from '../pipes/verify-email.pipe'
import { UsersService } from '../services/users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(
    @Body(VerifyEmail) data: CreateUserDto
  ): Promise<User> {
    const newUser = await this.usersService.createUser(data)

    return newUser
  }

  @AuthDeclaration('jwt', 'admin')
  @Get()
  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers()

    return users
  }
}
