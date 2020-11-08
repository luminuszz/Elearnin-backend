import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/createUserDto'
import { User, UserRole } from '../entities/user.entity'
// import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly adminUserRepository: Repository<User>
  ) {}

  public async createUser({
    email,
    name,
    password,
    city,
    state,
    zipCode,
  }: CreateUserDto): Promise<User> {
    const newUser = this.adminUserRepository.create({
      email,
      name,
      passwordHash: password,
      city,
      state,
      zipCode,
      role: UserRole.user,
    })

    await this.adminUserRepository.save(newUser)

    return newUser
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.adminUserRepository.find({
      where: { role: UserRole.user },
      relations: ['courses'],
    })

    return users
  }

  public async FindByEmail(email: string): Promise<User | undefined> {
    const foundUser = await this.adminUserRepository.findOne({
      where: { email },
    })

    return foundUser
  }
}
