import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/createUserDto'
import { User, UserRole } from '../entities/user.entity'
// import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async getAdminUsers(): Promise<User[]> {
    const adminUsers = await this.usersRepository.find({
      where: { role: UserRole.admin },
    })

    return adminUsers
  }

  public async createAdminUser(data: CreateUserDto): Promise<User> {
    const newAdminUser = this.usersRepository.create({
      ...data,
      passwordHash: data.password,
      role: UserRole.admin,
    })

    await this.usersRepository.save(newAdminUser)

    return newAdminUser
  }

  public async findAdminUserById(id: string): Promise<User> {
    const admin = await this.usersRepository.findOne(id, {
      where: { role: UserRole.admin },
    })

    return admin
  }
}
