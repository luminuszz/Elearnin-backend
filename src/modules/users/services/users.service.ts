import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/createUserDto'
import { User } from '../entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly adminUserRepository: Repository<User>
  ) {}

  public async createAdminUser({
    email,
    name,
    password,
    city,
    role,
    state,
    zipCode,
  }: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = this.adminUserRepository.create({
      email,
      name,
      passwordHash,
      city,
      state,
      zipCode,
      role,
    })

    await this.adminUserRepository.save(newUser)

    return newUser
  }

  public async getAllAdminUsers(): Promise<User[]> {
    const admins = await this.adminUserRepository.find()

    return admins
  }

  public async FindByEmail(email: string): Promise<User | undefined> {
    const foundUser = await this.adminUserRepository.findOneOrFail({
      where: { email },
    })

    if (!foundUser) {
      throw new Error('user not Found')
    }

    return foundUser
  }
}
