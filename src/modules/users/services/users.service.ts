import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/createUserDto'
import { User } from '../entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  private role: string

  constructor(
    @InjectRepository(User)
    private readonly adminUserRepository: Repository<User>
  ) {
    this.role = 'user'
  }

  public async createUser({
    email,
    name,
    password,
    city,
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
      role: this.role,
    })

    await this.adminUserRepository.save(newUser)

    return newUser
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.adminUserRepository.find({
      where: { role: this.role },
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
