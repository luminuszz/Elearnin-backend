import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { JWtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { CreateUserDto } from '../dtos/createUserDto'
import { User } from '../entities/user.entity'
import { VerifyEmail } from '../pipes/verify-email.pipe'
import { UsersService } from '../services/users.service'

@Controller('users')
@UseGuards(JWtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(VerifyEmail)
  public async createAdmin(@Body() data: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.createUser(data)

    return newUser
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers()

    return users
  }
}
